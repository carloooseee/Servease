// import "../css/home.css";
import "../css/profile.css"; 
import guy from "../images/guy.jpg";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h1>bruh u aint exist</h1>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-info card shadow p-4 rounded">
        <img 
          src={guy} 
          alt="Profile" 
          className="profile-pic mb-3 rounded-circle mx-auto d-block"
        />
        <h2 className="mb-3">
          Welcome, <strong>{user.first_name} {user.last_name}</strong>
        </h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phone_number}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}

export default Profile;
