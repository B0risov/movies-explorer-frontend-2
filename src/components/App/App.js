import {useState, useEffect} from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Popup from '../Popup/Popup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {moviesApi} from '../../utils/MoviesApi';
import {moviesApiSettings, shortsDuration} from '../../utils/utils';
import {mainApi} from '../../utils/MainApi';

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isSearchRunning, setIsSearchRunning] = useState(false);
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);
  const [isSearchSavedCompleted, setIsSearchSavedCompleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const [currentUser, setCurrentUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [searchSavedQuery, setSearchSavedQuery] = useState('');
  const [clearSignal, setClearSignal] = useState(0);
  const [searchShorts, setSearchShorts] = useState(JSON.parse(localStorage.getItem('searchShorts')) || '');
  const [cards, setCards] = useState([]); // Карточки для страницы "Фильмы", отфильтрованные поиском 
  const [savedCards, setSavedCards] = useState([]); // Карточки для "Сохраненных фильмов", отфильтрованные поиском
  const [savedCardsCache, setSavedCardsCache] = useState([]); // Все сохраненные карточки, не отфильтрованные поиском
  const [loggedIn, setLoggedIn] = useState(null); // В момент первого рендера значение еще не true и не false (для ProtectedRoute)
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenCheck(token);
    } else {
      setLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMenuBtnClick() {
    setIsNavigationOpen(true);
  }

  function closeNavigation() {
    setIsNavigationOpen(false);
  }

  function performSearch(newSearchQuery, newSearchShorts) {
    setIsSearchRunning(true);
    setIsError(false);
    setIsSearchCompleted(false);

    searchMovies(newSearchQuery).then((searchResult) => {
      if (newSearchShorts === true) {
        searchResult = searchResult.filter(function (movie) {
          return movie.duration <= shortsDuration;
        });
      }

      setIsSearchRunning(false);
      setIsSearchCompleted(true);

      setCards(searchResult);
    })
    .catch((err) => {
      console.log(err);
      setIsError(true);
    });
  }

  function handleSearch(newSearchQuery, newSearchShorts) {
    setSearchQuery(newSearchQuery);
    setSearchShorts(newSearchShorts);
    localStorage.setItem('searchQuery', newSearchQuery);
    localStorage.setItem('searchShorts', JSON.stringify(newSearchShorts));

    performSearch(newSearchQuery, newSearchShorts);
  }

  function handleSavedSearch(newSearchQuery, newSearchShorts) {
    setSearchSavedQuery(newSearchQuery);
    setIsError(false);
    setIsSearchSavedCompleted(false);

    var searchResult = savedCardsCache.filter((movie) =>
      movie.nameRU.toLowerCase()
        .includes(newSearchQuery.toLowerCase())
    );

    if (newSearchShorts === true) {
      searchResult = searchResult.filter(function (movie) {
        return movie.duration <= shortsDuration;
      });
    }

    setIsSearchSavedCompleted(true);
  
    setSavedCards(searchResult);
  }

  function searchMovies(query) {
    return new Promise(function(resolve, reject) {
      const moviesCacheJSON = localStorage.getItem('moviesCache');
      if (moviesCacheJSON) {
        const moviesCache = JSON.parse(moviesCacheJSON);
        if (moviesCache.length) {
          resolve(moviesCache.filter((movie) =>
          movie.nameRU.toLowerCase()
            .includes(query.toLowerCase())
          ));
        } else {
          localStorage.removeItem('moviesCache');
          reject();
        }
      } else {
        moviesApi.getMovies()
          .then(resMovies => {
            localStorage.setItem('moviesCache', JSON.stringify(resMovies));
            resolve(resMovies.filter((movie) =>
              movie.nameRU.toLowerCase()
                .includes(query.toLowerCase())
            ));
          })
          .catch((err) => reject(err));
      }
    })
  }

  function loadSavedMovies() {
    mainApi.getMovies()
    .then(resMovies => {
      setSavedCardsCache(resMovies);
      setSavedCards(resMovies);
      setSearchSavedQuery('');
      localStorage.setItem('savedMoviesCache', JSON.stringify(resMovies));
    })
    .catch((err) => {
      console.log(err);
      openPopup('Что-то пошло не так! Попробуйте ещё раз.');
    });
  }

  function resetSavedCards() {
    setSavedCards(savedCardsCache);
    setSearchSavedQuery('');
  }

  function handleRegister(email, name, password) {
    mainApi.register(email, name, password)
    .then((res) => {
      if (res) {
        mainApi.authorize(email, password)
        .then((res) => {
          if (res.token) {
            tokenCheck(res.token, true);
          }
        })
      }
    })
    .catch((err) => {
      console.log(err);
      openPopup('Что-то пошло не так! Попробуйте ещё раз.');
    });
  }

  function handleLogin(email, password) {
    mainApi.authorize(email, password)
    .then((res) => {
      if (res.token) {
        tokenCheck(res.token, true);
      }
    })
    .catch((err) => {
      console.log(err);
      openPopup('Что-то пошло не так! Попробуйте ещё раз.');
    });
  }

  function cardSave({ country, director, duration, year, description, image, trailerLink, id, nameRU, nameEN }) {
    mainApi.addMovie({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: moviesApiSettings.baseUrl + image.url, 
      trailerLink: trailerLink,
      thumbnail: moviesApiSettings.baseUrl + image.formats.thumbnail.url, 
      movieId: id,
      nameRU: nameRU,
      nameEN: nameEN,      
    })
    .then(res => {
      setSavedCards([...savedCards, res]);
      const newSavedCardsCache = [...savedCardsCache, res];
      setSavedCardsCache(newSavedCardsCache);
      localStorage.setItem('savedMoviesCache', JSON.stringify(newSavedCardsCache));
      setSearchSavedQuery('');
      setClearSignal(clearSignal + 1);
    })
    .catch((err) => {
      console.log(err);
      openPopup('Что-то пошло не так! Попробуйте ещё раз.');
      if (err.status === 401) {
        handleSignout();
      }
    });
  }

  function cardUnsave(card) {
    mainApi.deleteMovie(card._id)
    .then(res => {
      setSavedCards(savedCards.filter(savedCard => savedCard._id !== card._id));
      const newSavedCardsCache = savedCardsCache.filter(savedCard => savedCard._id !== card._id);
      setSavedCardsCache(newSavedCardsCache);
      localStorage.setItem('savedMoviesCache', JSON.stringify(newSavedCardsCache));
      setSearchSavedQuery('');
      setClearSignal(clearSignal + 1);
    })
    .catch((err) => {
      console.log(err);
      openPopup('Что-то пошло не так! Попробуйте ещё раз.');
      if (err.status === 401) {
        handleSignout();
      }
    });
  }

  function handleCardButton(card) {
    const movieId = card.movieId || card.id;

    const savedCard = savedCardsCache.find(i => i.movieId === movieId);
    if (savedCard && savedCard._id) {
      cardUnsave(savedCard);
    } else {
      cardSave(card);
    }
  }

  function handleUpdateUser(newUserInfo) {
    openPopup('Информация обновлена.');
    mainApi.setUserInfo(newUserInfo)
    .then((res) => {
      if (res) {
        setCurrentUser(res);
        openPopup('Информация обновлена.');
      }
    })
    .catch((err) => {
      console.log(err);
      openPopup('Что-то пошло не так! Попробуйте ещё раз.');
    });
  }

  function handleSignout() {
    setIsNavigationOpen(false);
    setIsSearchRunning(false);
    setIsSearchCompleted(false);
    setIsSearchSavedCompleted(false);
    setIsError(false);
    setIsPopupOpen(false);
    setPopupMessage('');
    setCurrentUser([]);
    setCards([]);
    setSavedCards([]);
    setSavedCardsCache([]);
    setSearchQuery('');
    setSearchSavedQuery('');
    setSearchShorts(false);
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('searchShorts');
    localStorage.removeItem('moviesCache');
    localStorage.removeItem('savedMoviesCache');
    history.push("/");
  }

  function loadUserData() {
    mainApi.getUserInfo()
      .then(resUserInfo => {
        setCurrentUser(resUserInfo);

        const savedMoviesCacheJSON = localStorage.getItem('savedMoviesCache');
        if (savedMoviesCacheJSON) {
          const savedMoviesCache = JSON.parse(savedMoviesCacheJSON);
          if (savedMoviesCache.length) {
            setSavedCards(savedMoviesCache);
            setSavedCardsCache(savedMoviesCache);
          } else {
            localStorage.removeItem('savedMoviesCache');
            loadSavedMovies();
          }
        } else {
          loadSavedMovies();
        }

        if (searchQuery.length) {
          performSearch(searchQuery, searchShorts);
        }
      })
      .catch((err) => {
        console.log(err);
        openPopup('Что-то пошло не так! Попробуйте ещё раз.');
      });
  }
  
  function tokenCheck(jwt, redirect = false) {
    if (jwt) {
      mainApi.getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          loadUserData();
          if (redirect) {
            history.push("/movies");
          }
        } else {
          handleSignout();
        }
      })
      .catch((err) => {
        console.log(err);
        handleSignout();
      });
    } else {
      handleSignout();
    }
  }

  function openPopup(message) {
    setPopupMessage(message);
    setIsPopupOpen(true);
  }

  function closeAllPopups() {
    setIsPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header loggedIn={loggedIn} onMenuBtnClick={handleMenuBtnClick}/>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute
            loggedIn={loggedIn}
            path="/movies"
            component={Movies}
            cards={cards}
            savedCards={savedCardsCache}
            onCardButton={handleCardButton}
            searchQuery={searchQuery}
            searchShorts={searchShorts}
            handleSearch={handleSearch}
            isSearchRunning={isSearchRunning}
            isSearchCompleted={isSearchCompleted}
            isError={isError}
          />
          <ProtectedRoute
            loggedIn={loggedIn}
            path="/saved-movies"
            component={SavedMovies}
            cards={savedCards}
            onCardButton={handleCardButton}
            searchQuery={searchSavedQuery}
            handleSearch={handleSavedSearch}
            isSearchCompleted={isSearchSavedCompleted}
            isError={isError}
            onMount={resetSavedCards}
            clearSignal={clearSignal}
          />
          <ProtectedRoute
            loggedIn={loggedIn}
            path="/profile"
            component={Profile}
            handleUpdateUser={handleUpdateUser}
            handleSignout={handleSignout}
          />
          <Route path="/signin">
            {loggedIn === true ? (
              <Redirect to="/" />
            ) : (
              <Login handleLogin={handleLogin} />
            )}
          </Route>
          <Route path="/signup">
            {loggedIn === true ? (
              <Redirect to="/" />
            ) : (
              <Register handleRegister={handleRegister} />
            )}
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
        <Footer />
        <Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
        <Popup message={popupMessage} isOpen={isPopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
