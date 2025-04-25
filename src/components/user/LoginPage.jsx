import { useContext, useState } from "react";
import "./LoginPage.css";
import api from "../../api";
import Error from "../ui/Error"
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {

  const {setIsAuthenticated, get_username} = useContext(AuthContext)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const location = useLocation()
  const navigate = useNavigate()


  const userInfo = {username, password}

  function handleSubmit(e){
    setLoading(true)
    e.preventDefault()

    api.post("token/", userInfo)
    .then(res =>{
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)
      setUsername("")
      setPassword("")
      console.log(res.data)
      setLoading(false)
      setIsAuthenticated(true)
      get_username()
      setError("")

      const from = location?.state?.from.pathname || "/";
      navigate(from, {replace:true});
    })
    .catch(err =>{
      setLoading(false)
      setError(err.message)
      console.log(err.message)
    })
  }


  return (
    <div className="login-container">
      <div className="login-card shadow">
        {error && <Error error={error} />}
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Please login to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              type="username"
              value={username} 
              onChange={(e)=>setUsername(e.target.value)}
              className="form-control" 
              id="username" 
              placeholder="Enter your username" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <button type="submit" className="login-btn w-100" disabled={loading}>Login</button>
        </form>
        <div className="login-footer">
          <p><a href="#" className="footer-link">Forgot password?</a></p>
          <p>Don't have an account? <a href="#" className="footer-link">Sign up</a></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;