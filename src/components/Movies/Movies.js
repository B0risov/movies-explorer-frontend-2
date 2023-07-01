import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({cards, savedCards, onCardButton, searchQuery, searchShorts, handleSearch, isSearchRunning, isSearchCompleted, isError}) {
  return (
    <main className="movies">
      <SearchForm handleSearch={handleSearch} searchQuery={searchQuery} searchShorts={searchShorts} isSearchCompleted={isSearchCompleted} isClearedOnMount={false} />
      <MoviesCardList cards={cards} savedCards={savedCards} onCardButton={onCardButton} isSearchRunning={isSearchRunning} isSearchCompleted={isSearchCompleted} isError={isError} isViewingSavedCards={false} />
    </main>
  );
}
