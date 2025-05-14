import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../images/logo.png";
import "../css/navigation.css";

function Navigation({ user: propUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem("user");
    }
  }, [propUser]); // updates when props change

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // or use navigate
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div className="container-fluid position-relative">
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

            <li className="nav-item dropdown">
              {user ? (
                <>
                  <div
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name || "User"}`}
                      alt="Profile"
                      style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                    />
                  </div>
                  <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                      <Link className="dropdown-item" to={user.role === "employee" ? "/EmployeeProfile" : "/Profile"}>
                        Profile
                      </Link>
                    </li>

                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </>
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
