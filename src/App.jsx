import { Header } from "./common/Header.jsx";
import { Footer } from "./common/Footer.jsx";
import { Cart } from "./user/Cart.jsx";
import { CartProvider } from "./context/cart";
import { Filters } from "./user/Filters.jsx";
import { Home } from "./common/Home.jsx";
import { Route, Routes } from 'react-router-dom';
import { Products } from "./user/Products.jsx";
import { Summary } from "./user/Summary.jsx";
import { FiltersProvider } from './context/filters.jsx'
import { AddBook } from "./admin/AddBook.jsx"
import { DeleteBook } from "./admin/DeleteBook.jsx"
import { AlterBook } from "./admin/AlterBook.jsx"
import { DeleteUser } from "./admin/DeleteUser.jsx"; 

import { Login } from "./user/Login.jsx"
import { RegistroUsuario } from "./user/Register.jsx"

import { ChangePassword } from "./user/ChangePassword.jsx"

import { useLocation } from "react-router-dom";


export function App() {
    const location = useLocation();
    const hideHeaderOnRoutes = ["/", "/login", "/register"];
    const shouldHideHeader = hideHeaderOnRoutes.includes(location.pathname);


    return (
        <div className ="font-sans">
            <CartProvider>
            {!shouldHideHeader && <Header />}
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
