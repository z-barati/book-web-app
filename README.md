# Book Management Web Application

## Project Overview
A React-based web application for managing books with user authentication and CRUD operations.

## Features

### Authentication
- **User Registration**: New users can create accounts
- **User Login**: Existing users can authenticate and receive access tokens
- **Token Management**: Maintain and use JWT tokens for API requests

### Book Management (Authorized Users Only)
- **List Books**: Display all books in a paginated list
- **Create Book**: Add new books to the system
- **Edit Book**: Modify existing book information
- **Delete Book**: Remove books from the system

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user and get access token

### Books (All require authentication)
- `GET /api/v1/books` - Get all books
- `POST /api/v1/books` - Create new book
- `PUT /api/v1/books/{id}` - Update existing book
- `DELETE /api/v1/books/{id}` - Delete book

## Technical Requirements

### Frontend Stack
- **React 18** - Main framework
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API calls
- **Context API** - State management for authentication
- **CSS Modules** - Styling

### Project Structure
```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── books/
│   │   ├── BookList.jsx
│   │   ├── BookForm.jsx
│   │   └── BookItem.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   └── ProtectedRoute.jsx
│   └── common/
│       ├── Loading.jsx
│       └── ErrorMessage.jsx
├── contexts/
│   └── AuthContext.jsx
├── services/
│   ├── authService.js
│   └── bookService.js
├── utils/
│   └── api.js
└── App.jsx
```

## Implementation Plan

### Phase 1: Project Setup
1. Initialize React application with Vite
2. Install dependencies
3. Set up project structure
4. Configure routing

### Phase 2: Authentication
1. Create AuthContext for state management
2. Implement login form
3. Implement registration form
4. Create protected route component
5. Set up token storage and management

### Phase 3: Book Management
1. Create book list component
2. Implement book creation form
3. Create book editing functionality
4. Add delete confirmation
5. Implement error handling and loading states

### Phase 4: UI/UX Enhancement
1. Add responsive design
2. Implement proper error messages
3. Add loading indicators
4. Create navigation menu
5. Style components

## API Integration Details

### Authentication Flow
1. User submits login/register form
2. API call to authentication endpoint
3. Store JWT token in localStorage
4. Update AuthContext state
5. Redirect to appropriate page

### Book Operations
1. All book API calls include Authorization header
2. Handle token expiration
3. Implement proper error handling
4. Add loading states for better UX

## Security Considerations
- Store tokens securely in localStorage
- Implement token refresh mechanism
- Add logout functionality
- Clear tokens on logout
- Protect routes from unauthorized access

## Development Guidelines
- Use functional components with hooks
- Implement proper error handling
- Add loading states for better UX
- Use semantic HTML
- Implement responsive design
- Follow React best practices