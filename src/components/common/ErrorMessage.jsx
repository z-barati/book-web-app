import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="card" style={{ textAlign: 'center', color: '#dc3545' }}>
      <h3>Error</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage; 