import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api";
import { toast } from 'react-toastify';

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    city: "",
    state: "",
    address: "",
  });

  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["#f8d7da", "#d1ecf1", "#d4edda", "#fff3cd"]; // Rouge, Bleu, Vert, Jaune pastel

  const navigate = useNavigate();

  useEffect(() => {
    api.get("user_info/")
      .then(res => setFormData(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.patch("user_info/", formData)
      .then(() => {
        toast.success("Update of your profile is successfully done!");
        navigate("/profile");
      })
      .catch(err => console.error(err));
  };

  const inputStyle = {
    backgroundColor: colors[colorIndex],
    transition: 'background-color 0.5s',
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Edit your profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Nom d'utilisateur"
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Adresse"
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="form-control"
              placeholder="Prénom"
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="form-control"
              placeholder="Nom"
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Téléphone"
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
              placeholder="Ville"
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-control"
              placeholder="Pays"
              style={inputStyle}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Edit now
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
