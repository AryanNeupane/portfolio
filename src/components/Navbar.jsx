import React, { useState } from 'react';
import { Shield, Menu, X, Download } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ currentPath, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <a
          href="/"
          className="brand-logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('/');
          }}
        >
          <Shield size={18} style={{ color: 'var(--accent-primary)' }} />
          <span>Aryan Neupane</span>
        </a>

        <nav aria-label="Main navigation">
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`nav-link ${currentPath === item.path ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }}
                  aria-current={currentPath === item.path ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}

            <li>
              <a
                href="/resume/Aryan-Neupane-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Download size={13} />
                <span>Resume</span>
              </a>
            </li>

            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
