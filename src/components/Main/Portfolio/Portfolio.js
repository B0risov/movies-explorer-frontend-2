export default function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__header">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__list-link" href="https://B0risov.github.io/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт</a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__list-link" href="https://B0risov.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт</a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__list-link" href="https://github.com/B0risov/react-mesto-api-full-gha/" target="_blank" rel="noreferrer">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
}