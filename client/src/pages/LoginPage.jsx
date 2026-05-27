// LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../api/apiService.js';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault(); // So the page doesn't refresh (Commenting for my learning)

    // Login 
    try {
      const obj = await apiService.login(email, password)
      console.log("Login email: ", email)
      console.log("Login password: ", password)
      await login(obj);
      alert("Login successful!");

      navigate("/api", { replace: true })

    } catch (err) {
      console.error("Failed to login:", err.message);
      alert("Login failed!");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          {/* Don't have an account? <a href="/api/signup">Sign up here</a> */}
          Don't have an account? <Link to="/api/signup">Sign up here</Link>
        </p>
      </form >
    </div >
  );

};

export default LoginPage;
