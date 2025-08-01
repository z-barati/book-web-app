import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bookService from '../../services/bookService';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    isbn: '',
    published_at: '',
    genre: '',
    pages: '',
    language: '',
    price: '',
    stock: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await bookService.getBook(id);
      const book = response.data || response;
      setFormData({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        isbn: book.isbn || '',
        published_at: book.published_at || '',
        genre: book.genre || '',
        pages: book.pages || '',
        language: book.language || '',
        price: book.price || '',
        stock: book.stock || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch book');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    }
    
    if (formData.published_at && (isNaN(formData.published_at) || formData.published_at < 1000 || formData.published_at > new Date().getFullYear())) {
      newErrors.published_at = 'Please enter a valid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const bookData = {
        ...formData,
        published_at: formData.published_at ? parseInt(formData.published_at) : null,
        pages: formData.pages ? parseInt(formData.pages) : null,
        price: formData.price ? parseFloat(formData.price) : null,
        stock: formData.stock ? parseInt(formData.stock) : null
      };

      if (isEditing) {
        await bookService.updateBook(id, bookData);
      } else {
        await bookService.createBook(bookData);
      }
      
      navigate('/books');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} book`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loading message="Loading book..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={isEditing ? fetchBook : undefined} />;
  }

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop: '30px' }}>
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          {isEditing ? 'Edit Book' : 'Add New Book'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="author" className="form-label">Author *</label>
            <input
              type="text"
              id="author"
              name="author"
              className="form-input"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
            />
            {errors.author && <div className="error-message">{errors.author}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="isbn" className="form-label">ISBN *</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              className="form-input"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN"
            />
            {errors.isbn && <div className="error-message">{errors.isbn}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label htmlFor="published_at" className="form-label">Published Year</label>
              <input
                type="number"
                id="published_at"
                name="published_at"
                className="form-input"
                value={formData.published_at}
                onChange={handleChange}
                placeholder="e.g., 2023"
                min="1000"
                max={new Date().getFullYear()}
              />
              {errors.published_at && <div className="error-message">{errors.published_at}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="genre" className="form-label">Genre</label>
              <input
                type="text"
                id="genre"
                name="genre"
                className="form-input"
                value={formData.genre}
                onChange={handleChange}
                placeholder="e.g., Fiction, Science Fiction"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label htmlFor="pages" className="form-label">Pages</label>
              <input
                type="number"
                id="pages"
                name="pages"
                className="form-input"
                value={formData.pages}
                onChange={handleChange}
                placeholder="e.g., 300"
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="language" className="form-label">Language</label>
              <input
                type="text"
                id="language"
                name="language"
                className="form-input"
                value={formData.language}
                onChange={handleChange}
                placeholder="e.g., English"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-input"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 29.99"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              className="form-input"
              value={formData.stock}
              onChange={handleChange}
              placeholder="e.g., 10"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter book description"
              rows="4"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Book' : 'Create Book')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/books')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm; 