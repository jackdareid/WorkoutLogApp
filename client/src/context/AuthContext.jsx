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
      if (token && !user) {
        try {
          const result = await apiService.getMe();
          if (result && result.data) {
            setUser(result.data);
          }
          else {
            logout();
          }
        } catch (err) {
          console.error("Authorization error:", err.message);
          logout();
        }
      } else if (!token) {
        setUser(null)
      };

      setLoading(false);
    };
    authorize();
  }, [token]);

  // Setting "Global" authority states here
  const login = async ({ token, data }) => {
    localStorage.setItem('token', token);

    setToken(token);
    setUser(data);
    setLoading(false);
  };

  const logout = async () => {
    console.log("Logging out!");
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);

