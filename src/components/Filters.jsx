import { useFilters } from '../hooks/useFilters';
import { useId } from 'react';
import './Filters.css';

export function Filters() {
    const { filters, setFilters } = useFilters();
    const minPriceFilterId = useId();
    // const categoryFilterId = useId();

    const handleChangeMinPrice = (event) => {
        const newMinPrice = parseFloat(event.target.value);
        setFilters((prevState) => ({
            ...prevState,
            minPrice: newMinPrice,
        }));
    };
    
   /*
    const handleChangeCategory = (event) => {
        console.log('Nueva categoría seleccionada:', event.target.value);
        setFilters((prevState) => ({
            ...prevState,
            category: event.target.value,
        }));
    };



                <div>
                <label htmlFor={categoryFilterId}>Categoría</label>
                <select className="plegable" id={categoryFilterId} onChange={handleChangeCategory} value={filters.category}>
                    <option value="all">Todas</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Horro">Horror</option>
                </select>
            </div>



    */
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
