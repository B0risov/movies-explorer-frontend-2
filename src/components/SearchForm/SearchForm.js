import {useEffect, useState} from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({searchQuery, searchShorts, handleSearch, isSearchCompleted, isClearedOnMount, clearSearchForm}) {

  const [currentSearchQuery, setCurrentSearchQuery] = useState(searchQuery || '');
  const [isEmptyQuery, setIsEmptyQuery] = useState(false); // Если true, значит, запрос не введен, сабмит нужно блокировать

  useEffect(() => {
    if (isClearedOnMount) {
      setCurrentSearchQuery('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearSearchForm]);

  function handleSubmit(e) {
    e.preventDefault();


    if (currentSearchQuery.length) {
      setIsEmptyQuery(false);
      handleSearch(currentSearchQuery, searchShorts);
    } else {
      setIsEmptyQuery(true);
    }
  }

  function handleShortsChange(newShortsValue) {

    if (isSearchCompleted) {

      if (currentSearchQuery.length) {
        handleSearch(currentSearchQuery, newShortsValue);
      }
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__combined" action="/" method="post" onSubmit={handleSubmit}>
        <div className="search-form__main-block">
          <div className="search-form__icon"></div>
          <input type="text" className="search-form__input" value={currentSearchQuery} onChange={e => setCurrentSearchQuery(e.target.value)} id="input" name="input" placeholder="Фильм"></input>
          {isEmptyQuery && (
            <div className="search-form__error">Нужно ввести ключевое слово</div>
          )}
          <button type="submit" className="search-form__button" value=""></button>
        </div>
        <div className="search-form__aux-block">
          <FilterCheckbox text="Короткометражки" сheckedInitial={searchShorts} handleClick={handleShortsChange} />
        </div>
      </form>
    </section>
  );
}
