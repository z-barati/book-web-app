import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import BookList from './components/books/BookList';
import BookForm from './components/books/BookForm';

// Home component
const Home = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="container" style={{ marginTop: '50px', textAlign: 'center' }}>
      <div className="card">
        <h1>Welcome to Book Management System</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
          Manage your personal book collection with ease
        </p>
        
        {isAuthenticated ? (
          <div>
            <p>You are logged in! Start managing your books.</p>
            <a href="/books" className="btn btn-primary" style={{ marginTop: '20px' }}>
              View My Books
            </a>
          </div>
        ) : (
          <div>
            <p>Please login or register to start managing your books.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
              <a href="/login" className="btn btn-primary">Login</a>
              <a href="/register" className="btn btn-secondary">Register</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// App content component
const AppContent = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route 
            path="/books" 
            element={
              <ProtectedRoute>
                <BookList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/books/new" 
            element={
              <ProtectedRoute>
                <BookForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/books/:id/edit" 
            element={
              <ProtectedRoute>
                <BookForm />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App; 