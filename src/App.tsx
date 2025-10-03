import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import "./css/App.css";

import { MovieProvider } from "./contexts/MoviesContext";
function App() {
  return (
    <div className="app-container">
      <NavBar></NavBar>
      <MovieProvider>
        <main className="content-container">
          <Outlet />
        </main>
      </MovieProvider>
    </div>
  );
}

export default App;
