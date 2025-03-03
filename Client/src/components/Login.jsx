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
      alert(res.data.message); // Show success alert
      setUser(res.data.user); // Set logged-in user
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      alert(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="login">
      <h2>Servease</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <input type="submit" value="Login"/>
        <p>Don't have an account? <Link to="/Register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
