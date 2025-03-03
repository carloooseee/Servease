import { Link } from "react-router-dom";
import Logo from "../images/logo.png";

function Navigation({ user }) { 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div className="container-fluid">
        <img src={Logo} alt="Servease Logo" width="100" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto"> 
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Become">
                Become a Helper
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Map">
                Map
              </Link>
            </li>
            <li className="nav-item">
              {user ? (  
                <Link className="nav-link" to="/Profile">Profile</Link>
              ) : (
                <Link className="nav-link" to="/Login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
