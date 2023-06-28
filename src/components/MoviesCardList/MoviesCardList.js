import {useEffect, useState} from 'react';
import {viewSettings} from '../../utils/utils';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList({cards, savedCards, onCardButton, isSearchRunning, isSearchCompleted, isError, isViewingSavedCards}) {
  const [cardsShown, setCardsShown] = useState(0);
  const [cardsToAdd, setCardsToAdd] = useState(0);
  const {width, height} = useResizeListener();

  useEffect(() => {
    renderCardList({width, height});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  function handleMoreButtonClick() {
    setCardsShown(cardsShown + cardsToAdd);
  }

  function MoreButton() {
    if (cards.length > cardsShown) {
      return (
        <button className="movies__more-btn" onClick={handleMoreButtonClick}>Еще</button>
      )
    }
  }

  function getWindowSize() {
    const {
      innerWidth: width,
      innerHeight: height,
    } = window;
    return {width, height};
  }
  
  function useResizeListener() {
    const [windowSize, setWindowSize] = useState(
      getWindowSize()
    );
  
    useEffect(() => {
      var resizeTimeout;

      function handleResizeThrottler() {
        if (!resizeTimeout) {
          resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            handleResize();
          }, 200);
        }
      }

      function handleResize() {
        setWindowSize(getWindowSize());
        renderCardList(getWindowSize());
      }
  
      window.addEventListener("resize", handleResizeThrottler, false);
      window.dispatchEvent(new Event('resize'));
      return () => window.removeEventListener("resize", handleResizeThrottler);
    }, []);
  
    return windowSize;
  }

  function renderCardList({width, height}) {
    if (width >= viewSettings.maxWidth.value) {
      setCardsShown(viewSettings.maxWidth.cardsShown);
      setCardsToAdd(viewSettings.maxWidth.cardsToAdd);
    } else if (width >= viewSettings.mediumWidth.value) {
      setCardsShown(viewSettings.mediumWidth.cardsShown);
      setCardsToAdd(viewSettings.mediumWidth.cardsToAdd);
    } else {
      setCardsShown(viewSettings.minWidth.cardsShown);
      setCardsToAdd(viewSettings.minWidth.cardsToAdd);
    }
  }

  return (
    <>
      {
        cards && cards.length && !isSearchRunning ? (
          <>
          <ul className="movies__cardlist">
            {cards.slice(0, cardsShown).map((card) => (
              <MoviesCard
                card={card}
                key={card.id || card._id}
                onCardButton={onCardButton}
                isSaved={
                  isViewingSavedCards ? (
                    true
                  ) : (
                    savedCards.some(i => i.movieId === card.id)
                  )
                }
                isViewingSavedCards={isViewingSavedCards}
              />
            ))}
          </ul>
          <MoreButton />
          </>
        ) : (
          isSearchCompleted === true && <p className="movies__message">Ничего не найдено</p>
        )
      }
      {
        isError ? (
          <p className="movies__message">Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз.</p>
        ) : (
          isSearchRunning && <Preloader />
        )
      }
    </>
  );
}
