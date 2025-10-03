import { NavLink } from "react-router";
import "../css/NavBar.css";
export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-link big-link">
        <NavLink to="/">Movie app</NavLink>
      </div>
      <div className="nav-links">
        <div className="nav-link">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="nav-link">
          <NavLink to="favorites">Favorites</NavLink>
        </div>
      </div>
    </nav>
  );
}
