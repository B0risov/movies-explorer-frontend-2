import {Link, NavLink, Route, Switch} from 'react-router-dom';
import logo from '../../images/header-logo.svg';

export default function Header({loggedIn, onMenuBtnClick}) {
  return (
    <header className="header">
      <Link to="/" className="header__logo-link"><img className="header__logo" src={logo} alt="Movies Explorer" /></Link>
      <div className="header__links">
        <Switch>
          <Route exact path="/">
            {loggedIn ? (
              <>
                <nav className="header__links_nav">
                  <li><NavLink to="/movies" activeClassName="header__link_type_active" className="header__link">Фильмы</NavLink></li>
                  <li><NavLink to="/saved-movies" activeClassName="header__link_type_active" className="header__link">Сохраненные фильмы</NavLink></li>
                </nav>
                <ul className="header__links_account">
                  <li><Link to="/profile" className="header__link header__link_type_account">Аккаунт</Link></li>
                </ul>
                <button className="header__menu-btn" onClick={onMenuBtnClick}></button>
              </>
            ) : (
              <ul className="header__links_onboard">
                <li><Link to="/signup" className="header__link">Регистрация</Link></li>
                <li><Link to="/signin" className="header__link header__link_type_signin">Войти</Link></li>
              </ul>
            )}
          </Route>
          {["/movies", "/saved-movies", "/profile"].map((path, i) =>
            <Route path={path} key={i}>
              <nav className="header__links_nav">
                <li><NavLink to="/movies" activeClassName="header__link_type_active" className="header__link">Фильмы</NavLink></li>
                <li><NavLink to="/saved-movies" activeClassName="header__link_type_active" className="header__link">Сохраненные фильмы</NavLink></li>
              </nav>
              <ul className="header__links_account">
                <li><Link to="/profile" className="header__link header__link_type_account">Аккаунт</Link></li>
              </ul>
              <button className="header__menu-btn" onClick={onMenuBtnClick}></button>
            </Route>
          )}
        </Switch>
      </div>
    </header>
  );
}
