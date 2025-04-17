import "../css/home.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h1>bruh u aint exist</h1>;
  }

  return (
    <div className="profile-container">
      <h1>Welcome, <strong>{user.first_name} {user.last_name}!</strong></h1>
      <h1><strong>Email:</strong> {user.email}</h1>
      <h1><strong>Phone Number:</strong> {user.phone_number}</h1>
    </div>
  );
}

export default Profile;
