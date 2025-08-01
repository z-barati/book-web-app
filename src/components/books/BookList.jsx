import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookService from '../../services/bookService';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import BookItem from './BookItem';

const BookList = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterAndPaginateBooks();
  }, [allBooks, searchTerm, currentPage]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await bookService.getBooks();
      const booksData = response.data || [];
      setAllBooks(booksData);
    } catch (err) {
      setError(err.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const filterAndPaginateBooks = () => {
    let filtered = allBooks;
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = allBooks.filter(book => 
        book.title?.toLowerCase().includes(searchLower) ||
        book.author?.toLowerCase().includes(searchLower) ||
        book.isbn?.toLowerCase().includes(searchLower) ||
        book.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = filtered.slice(startIndex, endIndex);
    
    setFilteredBooks(paginatedBooks);
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(bookId);
        setAllBooks(allBooks.filter(book => book.id !== bookId));
      } catch (err) {
        setError(err.message || 'Failed to delete book');
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  if (loading) {
    return <Loading message="Loading books..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchBooks} />;
  }

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Books</h1>
        <Link to="/books/new" className="btn btn-primary">
          Add New Book
        </Link>
      </div>

      {/* Search Form */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search books by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          {searchTerm && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>No books found</h3>
          <p>Try adjusting your search terms or add a new book.</p>
          <Link to="/books/new" className="btn btn-primary" style={{ marginTop: '20px' }}>
            Add Your First Book
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredBooks.map(book => (
            <BookItem 
              key={book.id} 
              book={book} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {(() => {
        const filteredCount = searchTerm 
          ? allBooks.filter(book => 
              book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              book.isbn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              book.description?.toLowerCase().includes(searchTerm.toLowerCase())
            ).length
          : allBooks.length;
        
        const totalPages = Math.ceil(filteredCount / itemsPerPage);
        
        return totalPages > 1 ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '10px' }}>
            <button
              className="btn btn-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Previous
            </button>
            
            <span style={{ padding: '10px 15px', backgroundColor: 'white', borderRadius: '4px' }}>
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              className="btn btn-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              Next
            </button>
          </div>
        ) : null;
      })()}
    </div>
  );
};

export default BookList; 