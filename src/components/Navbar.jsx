import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import React from 'react';


const getNavLinkClassName = ({ isActive }) => (
  isActive ? 'nav-link nav-link-active' : 'nav-link'
);

export default function Navbar({ isLoggedIn, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="navbar">
        <NavLink className="brand" to="/" onClick={closeMenu}>CineFind</NavLink>
        <button
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          aria-label="Main navigation"
          className={`primary-navigation${isMenuOpen ? ' primary-navigation-open' : ''}`}
          id="primary-navigation"
        >
          <NavLink className={getNavLinkClassName} end onClick={closeMenu} to="/">Discover</NavLink>
          <NavLink className={getNavLinkClassName} onClick={closeMenu} to="/watchlist">Watchlist</NavLink>
          <NavLink className={getNavLinkClassName} onClick={closeMenu} to="/favorites">Favorites</NavLink>
          {isLoggedIn ? (
            <button
              className="nav-link nav-button"
              onClick={() => {
                onLogout();
                closeMenu();
              }}
              type="button"
            >
              Sign out
            </button>
          ) : (
            <NavLink className={getNavLinkClassName} onClick={closeMenu} to="/login">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
