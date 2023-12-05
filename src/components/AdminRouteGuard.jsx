// AdminRouteGuard.jsx
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../auth/auth.js';

// eslint-disable-next-line react/prop-types
export function AdminRouteGuard({ element: Element, ...rest }) {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated() && getUserRole() === 'admin' ? (
          <Element />
        ) : (
          <Navigate to="/books" replace />
        )
      }
    />
  );
}