// Dashboard.jsx
import { useState, useEffect } from 'react';
import { apiService } from '../api/apiService.js';
import AddProgramForm from '../components/AddProgramForm';
import ProgramCard from '../components/ProgramCard';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchData = async (reverse = true) => {
    if (!localStorage.getItem('token')) return;

    try {
      const response = await apiService.getPrograms();
      setPrograms([...response.data].reverse());
      setLoading(false);
    } catch (err) {

      if (localStorage.getItem('token')) {
        alert("Failed to load programs");
      }
      setLoading(false);
    }
  }

  const handleShowForm = async (e) => {
    e.preventDefault();
    if (showAddForm) {
      setShowAddForm(false);
      return;
    }

    setShowAddForm(true);
  };

  const handleCreateProgram = async (newProgram) => {
    try {
      const response = await apiService.createProgram(newProgram);
      setPrograms([response.data, ...programs]);
      setShowAddForm(false);

    } catch (err) {
      console.error("Program creation failed:", err.message);
      alert("Program creation failed")
    }
  };

  const handleDeleteProgram = async (programId) => {
    try {
      await apiService.removeProgram(programId);
      setPrograms(programs.filter(p => p.program_id !== programId));
    } catch (err) {
      console.error("Deletion failed:", err.message);
      alert("Could not delete program");
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
      {showAddForm && <AddProgramForm onSave={handleCreateProgram} onCancel={handleShowForm} />}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '20px',
        alignItems: 'center',
      }}>
        <h2>Your workout programs</h2>
        {!showAddForm && <button onClick={handleShowForm}>Create new program</button>}
      </div>
      <div className="program-list">
        {programs.length > 0 ? (
          programs.map((program) => (
            <ProgramCard
              key={program.program_id}
              program={program}
              deleteProgram={handleDeleteProgram}
            />
          ))
        ) : (
          <p>No programs found. Time to create one!</p>
        )}
      </div>
    </div >
  );
}

export default Dashboard;
