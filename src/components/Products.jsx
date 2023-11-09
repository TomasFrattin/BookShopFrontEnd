import { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx';
import { useCart } from '../hooks/useCart.js';
import { useFilters } from '../hooks/useFilters';

export function Products() {
    const [products, setProducts] = useState([]);
    const { addToCart, removeFromCart, cart } = useCart();
    const { filters } = useFilters(); 

    useEffect(() => {
        axios.get('http://localhost:1234/books')
            .then(function (response) {
                const filteredProducts = response.data.filter(product => {
                    return (
                        product.price >= filters.minPrice &&
                        (filters.category === 'all' || product.category === filters.category)
                    );
                });
                setProducts(filteredProducts);
            })
            .catch(function (error) {
              
                console.error('Error al obtener productos:', error);
            });
    }, [filters]);

    const checkProductInCart = product => {
        return cart.some(item => item.id === product.id);
    };

    return (
        <main className="products">
            <ul>
                {products.slice(0, 30).map(product => {
                    const isProductInCart = checkProductInCart(product);

                    return (
                        <li key={product.id}>
                            <img src={product.image} alt={product.title}/>
                            <div>
                                <strong>{product.title}</strong> - ${product.price}
                            </div>
                            <div className='buttondiv'>
                                <button
                                    style={{backgroundColor: isProductInCart ? '#a72323' : '#238da7'}} 
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
        </main>
    );
}
