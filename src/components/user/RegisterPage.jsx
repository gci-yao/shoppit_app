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

  api.post("register_user/", formData)
    .then(res => {
      console.log(res.data);
      const { access, refresh } = res.data.token;

      // Stocke les tokens dans le localStorage par exemple
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      setLoading(false);
      navigate("/login"); // Par exemple après login auto
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
        <h2 className="text-center mb-4">Create your account</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
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
            <label className="form-label">Password</label>
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
            <label className="form-label">Firtsname</label>
            <input 
              type="text" 
              className="form-control" 
              name="first_name" 
              value={formData.first_name} 
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Lastname</label>
            <input 
              type="text" 
              className="form-control" 
              name="last_name" 
              value={formData.last_name} 
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input 
              type="text" 
              className="form-control" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <input 
              type="text" 
              className="form-control" 
              name="city" 
              value={formData.city} 
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Conutry</label>
            <input 
              type="text" 
              className="form-control" 
              name="state" 
              value={formData.state} 
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Création..." : "Create your account"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>Already registered ? <a href="/login">Login you</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
