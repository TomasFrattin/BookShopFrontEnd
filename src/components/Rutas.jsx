// Rutas.jsx
import { Outlet } from 'react-router-dom';
import { AdminRouteGuard } from './AdminRouteGuard';
import { AlterBook } from './AlterBook.jsx'
import { DeleteBook } from './DeleteBook.jsx'
import { AddBook } from './AddBook.jsx'

export function AdminRoutes() {
  return (
    <>
      <AdminRouteGuard path="/alterBook" element={<AlterBook />} />
      <AdminRouteGuard path="/deleteBook" element={<DeleteBook />} />
      <AdminRouteGuard path="/addBook" element={<AddBook />} />
      {/* ... otras rutas administrativas */}
      <Outlet />
    </>
  );
}
