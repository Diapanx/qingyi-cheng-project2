import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav>
      <ul>
        <li><Link className='nav-link' to="/">Home</Link></li>
        <li className="dropdown">
          <button className="btn nav-link" onClick={toggleDropdown}>
            Play
          </button>
          {dropdownOpen && (
            <ul className="dropdown-content">
              <li><Link className='option' to="/game/easy" onClick={toggleDropdown}>Easy</Link></li>
              <li><Link className='option' to="/game/medium" onClick={toggleDropdown}>Medium</Link></li>
              <li><Link className='option' to="/game/hard" onClick={toggleDropdown}>Hard</Link></li>
            </ul>
          )}
        </li>
        <li><Link className='nav-link' to="/rules">Rules</Link></li>
      </ul>
    </nav>
  );
}