// App.jsx
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';

function App() {
  // Global state for controlling login context
  const { token, logout } = useAuth();

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
          <p>:)</p>
        )}
      </div>
      <div>
        {/* Main contents handler  */}
        {token ? (
          <Dashboard />
        ) : (
          <LoginPage />
        )}
      </div>
    </div>
  )
}

export default App
