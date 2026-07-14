// SignUp.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../api/apiService';
import { useAuth } from '../context/AuthContext';

function SignUpPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    f_name: '',
    l_name: '',
    email: '',
    password: '',
    password_conf: '',
  });
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault(); // SOOO the page doesn't refresh
    setError('');

    if (formData.password !== formData.password_conf) {
      setError("Passwords do not match");
      return;
    }

    // Sign up --> need to create apiService signUp function.
    try {
      const obj = await apiService.signUp(
        formData.f_name,
        formData.l_name,
        formData.email,
        formData.password
      );
      console.log("SignUpPage obj: ", obj);
      console.log("Sign up successfull!");

      await login(obj);

      setFormData({
        f_name: '',
        l_name: '',
        email: '',
        password: '',
        password_conf: ''
      });
      navigate("/", { replace: true });
    } catch (err) {

      setError(err.message || "Sign up failed");
      console.log("Failed to sign up:", err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sign up!</h2>
      <form onSubmit={handleSignUp}>
        {error && (
          <div style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>
            {error}
          </div>
        )}
        <div>
          <input
            type="text"
            placeholder="First name"
            value={formData.f_name}
            onChange={(e) => setFormData({ ...formData, f_name: e.target.value })}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last name"
            value={formData.l_name}
            onChange={(e) => setFormData({ ...formData, l_name: e.target.value })}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="confirm password"
            autoComplete="new-password"
            value={formData.password_conf}
            onChange={(e) => setFormData({ ...formData, password_conf: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  )
};

export default SignUpPage;
