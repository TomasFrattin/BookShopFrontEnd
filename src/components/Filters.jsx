import { useFilters } from '../hooks/useFilters';
import { useId } from 'react';
import './Filters.css';

export function Filters() {
    const { filters, setFilters } = useFilters();
    const minPriceFilterId = useId();
    
    const handleChangeMinPrice = (event) => {
        const newMinPrice = parseFloat(event.target.value);
        setFilters((prevState) => ({
            ...prevState,
            minPrice: newMinPrice,
        }));
    };

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio</label>
                <input
                    type="range"
                    step="1"
                    id={minPriceFilterId}
                    min="0"
                    max="20"
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
            </div>
        </section>
    );
}
