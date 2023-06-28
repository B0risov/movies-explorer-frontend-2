import {Route, Switch} from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__wrapper">
        <nav className="footer__links">
          <Switch>
            <Route exact path="/">
              <a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="footer__link">Github</a>
            </Route>
            {["/movies", "/saved-movies"].map((path, i) =>
              <Route path={path} key={i}>
                <a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="footer__link">Github</a>
                <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="footer__link">Facebook</a>
              </Route>
            )}
          </Switch>
        </nav>
        <p className="footer__copyright">© 2023</p>
      </div>
    </footer>
  );
}
