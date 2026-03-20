// App.jsx
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  return (
    <div>
      <div className="App" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px'
      }}>
        <h1 style={{ margin: '0px' }}>Workout Logger</h1>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <p>:)</p>
        )}
      </div>
      <div>
        {isLoggedIn ? (
          <Dashboard />
        ) : (
          <LoginPage onLogin={() => setIsLoggedIn(true)} />
        )}
      </div>
    </div>
  )
}

export default App
