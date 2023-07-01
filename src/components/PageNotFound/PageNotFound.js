import {useHistory} from 'react-router-dom';

export default function PageNotFound() {
  const history = useHistory();

  return (
    <main className="not-found">
      <section className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description">Страница не найдена</p>
      </section>
      <button className="not-found__btn" onClick={() => history.goBack()} type="button">Назад</button>
    </main>
  );
}