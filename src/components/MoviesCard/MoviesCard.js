import {moviesApiSettings} from '../../utils/utils';

export default function MoviesCard({card, onCardButton, isSaved, isViewingSavedCards}) {
  const cardButtonClassName = (
    isSaved ? (
      isViewingSavedCards ? (
        'card__unsave-btn'
      ) : (
        'card__save-btn card__save-btn_active'
      )
    ) : (
      'card__save-btn'
    )
  );

  function formatDuration(duration) {
    return Math.floor(duration / 60) + 'ч ' + (duration % 60) + 'м';
  }

  function handleCardButton() {
    onCardButton(card);
  }

  return (
    <li className="card">
      <div className="card__header">
        <div className="card__text">
          <h2 className="card__title">{card.nameRU}</h2>
          <p className="card__duration">{formatDuration(card.duration)}</p>
        </div>
        <button type="button" className={cardButtonClassName} onClick={handleCardButton}></button>
      </div>
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="card__thumbnail" src={
            isViewingSavedCards ? (
              card.image
            ) : (
              moviesApiSettings.baseUrl + card.image.url
            )
          }
          alt={card.nameRU}
        />
      </a>
    </li>
  );
}
