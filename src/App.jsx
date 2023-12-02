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

export function App() {

    return (
        <div>
            <Header />
            <CartProvider>
                <FiltersProvider>
                    <Routes>
                        <Route path="/alterBook" element={<AlterBook />} />
                        <Route path="/deleteBook" element={<DeleteBook />} />
                        <Route path="/addBook" element={<AddBook />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/summary" element={<Summary />} />
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
