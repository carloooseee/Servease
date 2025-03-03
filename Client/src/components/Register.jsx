import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { Link } from "react-router-dom";
import "../css/forms.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ username, email, password });
      alert(res.data.message); // Show success alert
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <input type="submit" value="Register" />
        <p>Already have an account? <Link to="/Login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
