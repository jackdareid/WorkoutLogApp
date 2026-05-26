import { createContext, useState, useEffect, useContext } from 'react';
import { apiService } from "../api/apiService.js";

// Not used here because it gets activated once the user signs in
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Checks for token in local storage
  const [token, setToken] = useState(localStorage.getItem("token"));
  // User data stored here
  const [user, setUser] = useState(null);
  // Starts as true so that the dashbaord doesn't load until user is signed in
  const [loading, setLoading] = useState(true);

  // Verify token and restore on refresh
  // useEffect automatically triggers when token state changes. 
  // It defines and then runs the authorize function.
  useEffect(() => {
    const authorize = async () => {
      if (token) {
        try {
          const result = await apiService.getMe();
          if (result && result.data) {
            setUser(result.data);
            localStorage.setItem('token', token);
          } else {
            logout();
          }
        } catch (err) {
          logout();
        }
      } else {
        setUser(null)
      };
      setLoading(false);
    };
    authorize();
  }, [token]);

  // Setting "Global" authority states here
  const login = (jwtToken, userData) => {
    setUser(userData);
    setToken(jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
};

