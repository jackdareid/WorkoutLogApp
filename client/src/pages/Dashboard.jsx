// Project dashboard
import { useState, useEffect } from 'react';
import { apiService } from '../api/apiService.js';

function Dashboard() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await apiService.getPrograms();
      setPrograms(response.data);
      setLoading(false);
    } catch (err) {
      alert("Failed to load programs");
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading your programs...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your workout programs</h2>
      <div className="program-list">
        {programs.length > 0 ? (
          programs.map((program) => (
            <div key={program.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{program.name}</h3>
              <p>{program.notes}</p>
            </div>
          ))
        ) : (
          <p>No programs found. Time to create one!</p>
        )}
      </div>
    </div>

  )
}

export default Dashboard;
