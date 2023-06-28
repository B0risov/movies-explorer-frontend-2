import {Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function Navigation({isOpen, onClose}) {
  return (
    <div className={`navigation ${isOpen && 'navigation_opened'}`}>
    <div className="navigation__container">
      <div className="navigation__links">
        <Switch>
          <Route exact path="/">
            <ul className="navigation__links_nav">
              <li><Link to="#" className="navigation__link">Главная</Link></li>
              <li><Link to="#" className="navigation__link navigation__link_type_active">Фильмы</Link></li>
              <li><Link to="#" className="navigation__link">Сохраненные фильмы</Link></li>
            </ul>
            <ul className="navigation__links_account">
              <li><Link to="#" className="navigation__link navigation__link_type_account">Аккаунт</Link></li>
            </ul>
          </Route>
          {["/movies", "/saved-movies", "/profile"].map((path, i) =>
            <Route path={path} key={i}>
              <ul className="navigation__links_nav">
                <li><Link to="#" className="navigation__link">Главная</Link></li>
                <li><Link to="#" className="navigation__link navigation__link_type_active">Фильмы</Link></li>
                <li><Link to="#" className="navigation__link">Сохраненные фильмы</Link></li>
              </ul>
              <ul className="navigation__links_account">
                <li><Link to="#" className="navigation__link navigation__link_type_account">Аккаунт</Link></li>
              </ul>
            </Route>
          )}
        </Switch>
      </div>
      <button type="button" className="navigation__close-btn" onClick={onClose}></button>
    </div>
    </div>
  );
}
