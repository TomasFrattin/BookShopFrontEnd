// import { Filters } from "./Filters.jsx"
import "./Header.css"
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="navbar">
      <h1><Link className="a" to="/">📚 Book Shop</Link></h1>
      <nav>
        <ul>
          <li><Link to="/books">Libros</Link></li>
          <li><Link to="/search-page">Search Page</Link></li>
        </ul>
      </nav>
    </header>
  );
}