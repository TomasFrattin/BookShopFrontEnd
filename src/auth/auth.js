// auth.js
export const setAuthData = (token, role, name) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userRole', role);
  localStorage.setItem('userName', name)
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.setItem('userRole', "guest");
  localStorage.removeItem('userName')
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getUserRole = () => {
  return localStorage.getItem('userRole') || 'guest';
};