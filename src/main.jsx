import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { FiltersProvider } from './context/filters.jsx'

import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <FiltersProvider>
            <App />
        </FiltersProvider>
    </BrowserRouter>
)