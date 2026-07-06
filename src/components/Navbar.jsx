import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { IconKz } from '../utils/images';
import { useCartStore } from '../store/cartStore';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCartStore((state) => state.getCount());
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();

  const links = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.categories'), path: '/categories' },
    { name: t('nav.new'), path: '/new' },
    { name: t('nav.sale'), path: '/sale' },
    { name: t('nav.contacts'), path: '/contacts' },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const languages = [
    { code: 'ru', name: 'РУ', flag: 'ru' },
    { code: 'en', name: 'EN', flag: 'en' },
    { code: 'kk', name: 'KK', flag: 'kz' },
  ];

  return (
    <div className="nav-container">
      <div className="container">
        <div className="nav">
          <Link to="/" className="nav__logo">
            LOGO
          </Link>

          <button
            className="nav__burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav__nav ${menuOpen ? 'nav__nav--open' : ''}`}>
            <ul className="nav__menu">
              {links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="nav__link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <div className="nav__languages">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`nav__lang-btn ${language === lang.code ? 'nav__lang-btn--active' : ''}`}
                  onClick={() => changeLanguage(lang.code)}
                  title={lang.name}
                >
                  {lang.flag}
                </button>
              ))}
            </div>

            <button
              className="nav__theme-btn"
              onClick={toggleTheme}
              aria-label="Переключить тему"
              title={theme === 'light' ? 'Темная тема' : 'Светлая тема'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <Link to="/cart" className="nav__cart">
              {t('nav.cart')}
              {cartCount > 0 && <span className="nav__cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
