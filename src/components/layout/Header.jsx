import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="navbar-brand">
          Book Management System
        </Link>
        
        <ul className="navbar-nav">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/books" className="nav-link">Books</Link>
              </li>
              <li className="nav-item">
                <Link to="/books/new" className="nav-link">Add Book</Link>
              </li>
              <li className="nav-item">
                <span style={{ color: '#666', marginRight: '10px' }}>
                  Welcome, {user?.username}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-secondary"
                  style={{ padding: '5px 10px', fontSize: '12px' }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header; 