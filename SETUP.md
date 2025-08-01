# Project Setup Guide

## Step 1: Initialize React Application

```bash
# Create React app with Vite
npm create vite@latest book-web-app -- --template react
cd book-web-app

# Install dependencies
npm install
```

## Step 2: Install Required Dependencies

```bash
# Routing
npm install react-router-dom

# HTTP Client
npm install axios

# UI Components (Optional - for better styling)
npm install @mui/material @emotion/react @emotion/styled
# OR
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

# Form handling (Optional)
npm install react-hook-form

# Validation (Optional)
npm install yup @hookform/resolvers

# Icons (Optional)
npm install react-icons

# Date handling (Optional)
npm install date-fns
```

## Step 3: Project Structure Setup

Create the following directory structure:

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
├── styles/
│   └── global.css
└── App.jsx
```

## Step 4: Environment Configuration

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=Book Management System
```

## Step 5: Development Scripts

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

## Step 6: ESLint Configuration (Optional)

```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks
```

Create `.eslintrc.json`:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```

## Step 7: Git Configuration

Update `.gitignore`:

```
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories
.vscode/
.idea/

# OS generated files
.DS_Store
Thumbs.db
```

## Step 8: Development Workflow

### Starting Development
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Step 9: API Configuration

### Base API Setup
The application will use the following API endpoints:

- **Base URL**: `http://localhost:3000/api/v1`
- **Authentication**: JWT tokens
- **Content-Type**: `application/json`

### API Response Format
```javascript
// Success Response
{
  success: true,
  data: object | array,
  message: string
}

// Error Response
{
  success: false,
  error: string,
  message: string
}
```

## Step 10: Testing Setup (Optional)

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

## Step 11: Deployment Preparation

### Build Optimization
- Enable code splitting
- Optimize bundle size
- Configure environment variables
- Set up CI/CD pipeline

### Environment Variables
- Development: `.env.development`
- Production: `.env.production`
- Testing: `.env.test`

## Next Steps

After completing the setup:

1. **Phase 1**: Implement authentication system
2. **Phase 2**: Create book management components
3. **Phase 3**: Add styling and UI/UX improvements
4. **Phase 4**: Testing and optimization
5. **Phase 5**: Deployment

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change port in `vite.config.js`
2. **CORS issues**: Configure API server CORS settings
3. **Build errors**: Check for missing dependencies
4. **Routing issues**: Ensure React Router is properly configured

### Development Tips

1. Use React Developer Tools for debugging
2. Enable hot reload for faster development
3. Use console.log for debugging API calls
4. Check network tab for API request/response
5. Use browser dev tools for styling issues 