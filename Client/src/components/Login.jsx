import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { Link } from "react-router-dom";
import "../css/forms.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      console.log("Login response:", res); // Check structure in console
  
      const user = res?.data?.user || res?.data?.userFound; // <- fallback!
      const message = res?.data?.message;
  
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        alert(message || "Login successful!");
        navigate("/Profile");
      } else {
        alert("Login failed: No user object returned");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  

  return (
    <div className="login">
      <h2>Servease</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Login" />
        <p>
          Don't have an account? <Link to="/Register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
