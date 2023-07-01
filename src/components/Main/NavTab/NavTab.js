import {Link} from 'react-router-dom';

export default function NavTab() {
  return (
    <nav className="navtab">
      <Link to="/" className="navtab__link">О проекте</Link>
      <Link to="/" className="navtab__link">Технологии</Link>
      <Link to="/" className="navtab__link">Студент</Link>
    </nav>
  );
}