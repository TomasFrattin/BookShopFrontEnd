import { products as initialProducts } from "./mocks/products.json"
import { Products } from "./components/Products.jsx"
import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer"
import { useFilters } from './hooks/useFilters'
import { Cart } from "./components/Cart"
import { CartProvider } from "./context/cart"
import { Filters } from "./components/Filters.jsx"
import { Home } from "./components/Home.jsx"
import { Route, Routes } from 'react-router-dom'


export function App(){
  const { filterProducts} = useFilters()

  const filteredProducts = filterProducts(initialProducts)



  const SearchPage = () => <h1>Search Page</h1>

  return(
    <div>
      <Header />
      <CartProvider>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/search-page" element={<SearchPage />}/>
        <Route path="/books" element={
          <div>
            <Filters />
            <Cart />
            <Products products={filteredProducts} />
          </div>}/>
        <Route path="/cart"  />
      </Routes>
      <Footer />
      </CartProvider>
    </div>



/*    <CartProvider>
      <Header />
      <Filters />
      <Cart />
      <Products products={filteredProducts} />
      <Footer />
    </CartProvider>*/
)
}