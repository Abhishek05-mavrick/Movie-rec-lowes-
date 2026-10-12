import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="brand" to="/">CineFind</NavLink>
      <nav aria-label="Main navigation">
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/">Discover</NavLink>
        <NavLink className="nav-link" to="/watchlist">Watchlist</NavLink>
        <NavLink className="nav-link" to="/favorites">Favorites</NavLink>
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </nav>
    </header>
  );
}
