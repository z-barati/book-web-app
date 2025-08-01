import api from '../utils/api';

const bookService = {
  // Get all books
  async getBooks(params = {}) {
    try {
      const response = await api.get('/books', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch books' };
    }
  },

  // Get single book by ID
  async getBook(id) {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch book' };
    }
  },

  // Create new book
  async createBook(bookData) {
    try {
      const response = await api.post('/books', bookData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create book' };
    }
  },

  // Update existing book
  async updateBook(id, bookData) {
    try {
      const response = await api.put(`/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update book' };
    }
  },

  // Delete book
  async deleteBook(id) {
    try {
      const response = await api.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete book' };
    }
  }
};

export default bookService; 