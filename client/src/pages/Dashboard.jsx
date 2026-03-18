// Dashboard.jsx
import { useState, useEffect } from 'react';
import { apiService } from '../api/apiService.js';

function Dashboard({ onLogout }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!localStorage.getItem('token')) return;

    try {
      const response = await apiService.getPrograms();
      setPrograms(response.data);
      setLoading(false);
    } catch (err) {

      if (localStorage.getItem('token')) {
        alert("Failed to load programs");
      }
      setLoading(false);
    }
  }

  // const viewWorkouts = async () => {
  //   try {
  //     const response = await apiService.
  //   }
  // }

  // const handleDelete = async () => {
  //   if (!window.confirm("Are you sure you want to delete this program?")) {
  //     return
  //   }
  //
  //   try {
  //     await apiService.remove
  //   }
  // }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading your programs...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your workout programs</h2>
      <button onClick={onLogout} style={{ float: 'right' }}>
        Logout
      </button>
      <div className="program-list">
        {programs.length > 0 ? (
          programs.map((program) => (
            <div key={program.program_id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
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
