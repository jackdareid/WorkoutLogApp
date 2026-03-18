import { useState } from 'react';
import { apiService } from '../api/apiService.js';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault(); // So the page doesn't refresh (Commenting for my learning)

    // Login 
    try {
      const { token } = await apiService.login(email, password)
      localStorage.setItem('token', token);
      onLogin();
      alert("Login successful!");

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
      </form >
    </div >
  );

};

export default LoginPage;
