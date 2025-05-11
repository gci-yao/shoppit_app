import { useState } from "react";
import api from "../../api";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterPage.css";

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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation de base côté client
    if (!formData.username || !formData.email || !formData.password) {
      setError("Username, email et mot de passe sont obligatoires");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Données envoyées:", formData);

      const registrationResponse = await api.post("register_user/", formData);
      console.log("Réponse du serveur:", registrationResponse.data);

      if (registrationResponse.data?.token) {
        const { access, refresh } = registrationResponse.data.token;
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        try {
          await api.post("send_welcome_email/", {
            email: formData.email,
            username: formData.username
          });
        } catch (emailError) {
          console.warn("Erreur d'envoi d'email:", emailError);
        }

        setRegistrationSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      const serverError = err.response?.data;
      console.error("Erreur complète:", {
        message: err.message,
        status: err.response?.status,
        data: serverError,
        validation: serverError?.errors
      });

      // Diagnostic brut (utile en dev)
      console.log("Détail brut de l'erreur:", serverError);

      let errorMessage = "Erreur lors de l'inscription";

      if (serverError?.errors) {
        errorMessage = Object.entries(serverError.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");
      } else if (serverError?.message) {
        errorMessage = serverError.message;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (serverError) {
        errorMessage = JSON.stringify(serverError);
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  if (registrationSuccess) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card p-4 shadow text-center" style={{ width: "100%", maxWidth: "500px" }}>
          <h2 className="text-success mb-3">Inscription réussie !</h2>
          <p>Un email de confirmation a été envoyé à {formData.email}</p>
          <p>Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Create your account</h2>

        {error && (
          <div className="alert alert-danger">
            {error.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username*</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email*</label>
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
            <label className="form-label">Password*</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">First name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last name</label>
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
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10,15}"
              title="Numéro de téléphone (10-15 chiffres)"
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
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Création en cours...
              </>
            ) : (
              "Create your account"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already registered? <Link to="/login" className="text-primary">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
