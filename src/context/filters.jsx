import { createContext, useState} from "react"

//Crear contexto
export const FiltersContext = createContext ()

//Crear el Provider
export function FiltersProvider ({children}) {
    const [filters, setFilters] = useState({
        category: "all",
        minPrice: 0
    })

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}
        >
            {children}
        </FiltersContext.Provider>
    )
}