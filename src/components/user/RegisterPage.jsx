import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css"; // (on pourra styliser un peu plus si besoin)

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    city: "",
    state: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    api.post("/admin/core/customuser/", formData)
      .then(res => {
        console.log(res.data);
        setLoading(false);
        navigate("/login"); // Redirige vers login après enregistrement
      })
      .catch(err => {
        console.log(err.message);
        setError(err.message);
        setLoading(false);
      });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Créer un compte</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom d'utilisateur</label>
            <input 
              type="text" 
              className="form-control" 
              name="username" 
              value={formData.username} 
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Prénom</label>
            <input 
              type="text" 
              className="form-control" 
              name="first_name" 
              value={formData.first_name} 
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input 
              type="text" 
              className="form-control" 
              name="last_name" 
              value={formData.last_name} 
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Téléphone</label>
            <input 
              type="text" 
              className="form-control" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ville</label>
            <input 
              type="text" 
              className="form-control" 
              name="city" 
              value={formData.city} 
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Pays</label>
            <input 
              type="text" 
              className="form-control" 
              name="state" 
              value={formData.state} 
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Création..." : "Créer un compte"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>Déjà inscrit ? <a href="/login">Connecte-toi</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
