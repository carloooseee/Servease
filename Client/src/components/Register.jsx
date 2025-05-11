import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { Link } from "react-router-dom";
import "../css/forms.css";
import "../css/style.css";
import "../css/register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { firstName, lastName, email, phone, password, role };

    console.log("Sending user data:", userData);

    try {
      const res = await registerUser(userData);
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="formsContainer">
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="tel" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} required />
        <select name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="customer">Customer</option>
          <option value="employee">Employee</option>
        </select>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <input type="submit" value="Register" />
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
    </div>
  );
};

export default Register;
