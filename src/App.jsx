import { products as initialProducts } from "./mocks/products.json"
import { Products } from "./components/Products.jsx"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { useFilters } from './hooks/useFilters'
import { Cart } from "./components/Cart"
import { CartProvider } from "./context/cart"

export function App(){
  const { filterProducts} = useFilters()

  const filteredProducts = filterProducts(initialProducts)

  return(
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
 
    </CartProvider>
)
}