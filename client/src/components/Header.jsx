import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header justify-between">
      <div className="logo flex items-center">
        <h6 className="font-bold">MyApp</h6>
      </div>
      <nav className={`side-menu ${isOpen ? 'open' : ''} m-2`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
        </ul>
      </nav>

      <button className="hamburger block sm:hidden" onClick={toggleMenu}>
        ☰
      </button>

      {/* Optional: Overlay when menu is open */}
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
}

export default Header;
