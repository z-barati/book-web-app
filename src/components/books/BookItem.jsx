import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = ({ book, onDelete }) => {
  const handleDelete = () => {
    onDelete(book.id);
  };

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ marginBottom: '10px', color: '#333' }}>{book.title}</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <p style={{ margin: '5px 0', color: '#666' }}>
            <strong>Author:</strong> {book.author}
          </p>
          <p style={{ margin: '5px 0', color: '#666' }}>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          {book.published_at && (
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Published:</strong> {new Date(book.published_at).getFullYear()}
            </p>
          )}
          {book.genre && (
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Genre:</strong> {book.genre}
            </p>
          )}
          {book.pages && (
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Pages:</strong> {book.pages}
            </p>
          )}
          {book.language && (
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Language:</strong> {book.language}
            </p>
          )}
          {book.price && (
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Price:</strong> ${book.price}
            </p>
          )}
          {book.stock !== undefined && (
            <p style={{ margin: '5px 0', color: '#666' }}>
              <strong>Stock:</strong> {book.stock}
            </p>
          )}
        </div>

        {book.description && (
          <div style={{ marginBottom: '15px' }}>
            <p style={{ 
              color: '#666', 
              fontSize: '14px', 
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {book.description}
            </p>
          </div>
        )}

        <div style={{ fontSize: '12px', color: '#999', marginTop: 'auto' }}>
          <p>Added: {new Date(book.created_at).toLocaleDateString()}</p>
          {book.updated_at !== book.created_at && (
            <p>Updated: {new Date(book.updated_at).toLocaleDateString()}</p>
          )}
          {book.user && (
            <p>Added by: {book.user.username}</p>
          )}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginTop: '20px',
        borderTop: '1px solid #eee',
        paddingTop: '15px'
      }}>
        <Link 
          to={`/books/${book.id}/edit`} 
          className="btn btn-primary"
          style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}
        >
          Edit
        </Link>
        <button 
          onClick={handleDelete}
          className="btn btn-danger"
          style={{ flex: 1 }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookItem; 