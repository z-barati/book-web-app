# Book Management Web Application

A React-based web application for managing books with user authentication and CRUD operations.

## Features

- ✅ User registration and login
- ✅ JWT token authentication
- ✅ Protected routes
- ✅ Book CRUD operations (Create, Read, Update, Delete)
- ✅ Search and pagination
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling

## Prerequisites

Before running this application, you need to have Node.js installed on your system.

### Install Node.js

1. Download Node.js from [https://nodejs.org/](https://nodejs.org/)
2. Install it on your system
3. Verify installation by running:
   ```bash
   node --version
   npm --version
   ```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your API URL:

```bash
cp env.example .env
```

Edit `.env` file and set your API base URL:
```
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=Book Management System
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## API Endpoints

The application expects the following API endpoints:

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Books (All require authentication)
- `GET /api/v1/books` - Get all books
- `POST /api/v1/books` - Create new book
- `PUT /api/v1/books/{id}` - Update existing book
- `DELETE /api/v1/books/{id}` - Delete book

## Usage

1. **Register/Login**: Start by creating an account or logging in
2. **View Books**: Browse your book collection with search and pagination
3. **Add Books**: Create new books with detailed information
4. **Edit Books**: Modify existing book details
5. **Delete Books**: Remove books from your collection

## Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── books/         # Book management components
│   ├── layout/        # Layout components
│   └── common/        # Reusable components
├── contexts/          # React contexts
├── services/          # API services
├── utils/             # Utility functions
└── styles/            # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Troubleshooting

### Common Issues

1. **Port conflicts**: The app runs on port 3001 by default
2. **API connection**: Ensure your backend API is running
3. **CORS issues**: Configure your API server to allow requests from the frontend

### Development Tips

- Use browser dev tools to debug API calls
- Check the Network tab for request/response details
- Use React Developer Tools for component debugging

## Technologies Used

- React 18
- React Router DOM
- Axios for HTTP requests
- Context API for state management
- CSS for styling
- Vite for build tooling 