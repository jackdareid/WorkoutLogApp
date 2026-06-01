// HomePage.jsx

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h2>Welcome back, {user?.f_name || 'fella'}!</h2>

      <div style={{ marginTop: '25px' }}>
        <Link
          to="/api/programs"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Go to Programs
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
