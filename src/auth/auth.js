export const setAuthData = (token, rol, name) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userRol', rol);
  localStorage.setItem('userName', name);
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.setItem('userRol', "guest");
//  localStorage.removeItem('useRol');
  localStorage.removeItem('userName');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getUserRole = () => {
  return localStorage.getItem('userRol') || 'guest';
};

export const getUserUsername = () => {
  return localStorage.getItem('userName') || 'no sabemos'
}