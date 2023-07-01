import {useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({cards, onCardButton, searchQuery, handleSearch, isSearchCompleted, isError, onMount, clearSignal}) {

  useEffect(() => {
    onMount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="saved-movies">
      <SearchForm handleSearch={handleSearch} searchQuery={searchQuery} searchShorts={false} isSearchCompleted={isSearchCompleted} isClearedOnMount={true} clearSearchForm={clearSignal} />
      <MoviesCardList cards={cards} onCardButton={onCardButton} isSearchRunning={false} isSearchCompleted={isSearchCompleted} isError={isError} isViewingSavedCards={true} />
    </main>
  );
}
