import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/cart";
import { Filters } from "./components/Filters.jsx";
import { Home } from "./components/Home.jsx";
import { Route, Routes } from 'react-router-dom';
import { Products } from "./components/Products.jsx";
import { Summary } from "./components/Summary.jsx";
import { FiltersProvider } from './context/filters.jsx'
import { AddBook } from "./components/AddBook.jsx"
import { DeleteBook } from "./components/DeleteBook.jsx"
import { AlterBook } from "./components/AlterBook.jsx"
import { DeleteUser } from "./components/DeleteUser.jsx"; 

import { Login } from "./components/Login.jsx"
import { RegistroUsuario } from "./components/Register.jsx"

import { ChangePassword } from "./components/ChangePassword.jsx"

export function App() {

    return (
        <div>
            <CartProvider>
            <Header />
                <FiltersProvider>
                    <Routes>
                        {/* Rutas de Guest */}
                        <Route path="/register" element={<RegistroUsuario />} />
                        <Route path="/login" element={<Login />} /> 
                        <Route path="/" element={<Home />} />
                        {/* Rutas de Admin */}
                        <Route path="/alterBook" element={<AlterBook />} />
                        <Route path="/deleteBook" element={<DeleteBook />} />
                        <Route path="/addBook" element={<AddBook />} />
                        <Route path="/deleteUser" element={<DeleteUser />} />
                        {/* Rutas de User */}
                        <Route path="/summary" element={<Summary />} />
                        <Route path="/changePassword" element={<ChangePassword />} />
                        <Route path="/books" element={
                            <div>
                                <Filters />
                                <Cart />
                                <Products />
                            </div>
                        } />
                    </Routes>
                </FiltersProvider>
            </CartProvider>
        <Footer />
        </div>
    );
}
