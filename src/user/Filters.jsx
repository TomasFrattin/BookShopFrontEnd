import { useFilters } from '../hooks/useFilters';
import { useId } from 'react';

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
        <section>
            <div className="flex justify-center mt-4 space-x-5 text-lg">
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
