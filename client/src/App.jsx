// App.jsx
import LoginPage from './pages/LoginPage';
import { Navigate, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';

function App() {
  // Global state for controlling login context
  const { token, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="App" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px'
      }}>
        {/* Logout handler   */}
        <h1 style={{ margin: '0px' }}>Workout Logger</h1>
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <p>Please sign in</p>
        )}
      </div>
      <div style={{ padding: '20px' }}>
        {token ? (
          <Dashboard />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}

export default App
