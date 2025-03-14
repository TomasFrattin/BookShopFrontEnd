import { useState, useEffect } from "react";

import { AddToCartIcon, RemoveFromCartIcon } from "../Icons.jsx";
import { useCart } from "../hooks/useCart.js";
import { useFilters } from "../hooks/useFilters.js";
import { api } from "../utils/axiosInstance";

export function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart, removeFromCart, cart } = useCart();
  const { filters } = useFilters();

  useEffect(() => {
    api
      .get("/books")
      .then((response) => {
        const filteredProducts = response.data.filter((product) => {
          return (
            product.price >= filters.minPrice &&
            (filters.category === "all" ||
              product.category === filters.category)
          );
        });
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, [filters]);

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="relative w-full flex flex-col items-center min-h-screen">
      <ul className="mb-14 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4 w-full p-4">
        {currentProducts.map((product) => {
          const isProductInCart = checkProductInCart(product);

          return (
            <li
              key={product.id}
              className="flex flex-col justify-between gap-4 shadow-lg rounded-md bg-custom2 text-white p-4"
            >
              <img
                src={product.image}
                alt={product.title}
                className="rounded-md w-full aspect-square object-cover bg-white transition-transform duration-300 hover:scale-105"
              />

              <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-center">
                  <strong className="text-lg">{product.title}</strong>
                  <span className="text-lg font-semibold">
                    ${product.price}
                  </span>
                </div>

                <div className="mt-2 mx-4 text-sm text-gray-300 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">{product.rate}</span>
                    <span className="text-yellow-400">⭐</span>
                  </div>

                  <span className="italic">{product.genre}</span>
                </div>

                <p className="text-gray-400 text-xs mt-2">
                  Disponibilidad: {product.stock}
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  className={`px-6 py-3 rounded-md transition-colors ${
                    isProductInCart ? "bg-red-700" : "bg-blue-600"
                  }`}
                  onClick={() => {
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product);
                  }}
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="absolute bottom-0 w-full p-4 text-center shadow-md">
    {Array.from(
      { length: Math.ceil(products.length / productsPerPage) },
      (_, index) => (
        <button
          key={index + 1}
          onClick={() => paginate(index + 1)}
          className={`mx-1 px-3 py-1 rounded font-bold transition-colors 
    ${
      currentPage === index + 1
        ? "bg-blue-600 text-white border-2 border-blue-800 shadow-lg"
        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
    }`}
        >
          {index + 1}
        </button>
      )
    )}
  </div>

    </main>
  );
}
