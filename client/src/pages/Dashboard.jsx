// Dashboard.jsx
import { useState, useEffect } from 'react';
import { apiService } from '../api/apiService.js';

function Dashboard({ onLogout }) {
  const [programs, setPrograms] = useState([]);
  const [currProgramId, setCurrProgramId] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [currWorkoutId, setCurrWorkoutId] = useState(null);
  const [exercises, setExercises] = useState([]);
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

  const viewWorkouts = async (programId) => {
    setExercises([]);
    setCurrWorkoutId(null);
    if (currProgramId === programId) {
      setCurrProgramId(null);
      setWorkouts([]);
      return;
    }

    try {
      const response = await apiService.getWorkouts(programId);
      setCurrProgramId(programId);
      setWorkouts(response.data);
    } catch (err) {
      console.error("Failed to retrieve workouts:", err.message);
      alert("Failed to retrieve workouts");
    }

  };

  const viewWorkoutExercises = async (programId, workoutId) => {
    if (currWorkoutId === workoutId) {
      setCurrWorkoutId(null);
      setExercises([]);
      return;
    }
    try {
      const response = await apiService.getWorkoutExercises(programId, workoutId);
      setCurrWorkoutId(workoutId);
      setExercises(response.data);
    } catch (err) {
      console.error("Failed to retrieve workout exercises:", err.message);
      alert("Failed to retrieve workout exercises");
    }
  };

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
              <button onClick={() => viewWorkouts(program.program_id)}>
                {currProgramId === program.program_id ? "Close" : "View Workouts"}
              </button>
              <p>{program.notes}</p>
              {currProgramId === program.program_id &&
                <div className="workoutDetails">
                  {workouts.length > 0 ? (
                    workouts.map((w) => (
                      <div key={w.workout_id}>
                        <h5>{w.name}: {w.notes}</h5>
                        <button onClick={() => viewWorkoutExercises(program.program_id, w.workout_id)}>
                          {currWorkoutId === w.workout_id ? "Close" : "View Workout Details"}
                        </button>
                        {currWorkoutId === w.workout_id &&
                          <div className="exerciseDetails">
                            {exercises.length > 0 ? (
                              exercises.map((e) => (
                                <p key={e.exercise_id}>{e.name}</p>
                              ))
                            ) : (
                              <p>No exercises found</p>
                            )}
                          </div>
                        }
                      </div>
                    ))
                  ) : (
                    <p>No workouts found</p>
                  )}
                </div>
              }
            </div>
          ))
        ) : (
          <p>No programs found. Time to create one!</p>
        )}
      </div>
    </div >

  )
}

export default Dashboard;
