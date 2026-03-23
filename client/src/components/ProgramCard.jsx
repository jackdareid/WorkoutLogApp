// ProgramCard.jsx
import { useState } from 'react';
import { apiService } from '../api/apiService';

const ProgramCard = ({ program, deleteProgram }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currWorkoutId, setCurrWorkoutId] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [confirmedDelete, setConfirmedDelete] = useState(false);


  const viewWorkouts = async (programId) => {
    if (isOpen) {
      setIsOpen(false);
      setWorkouts([]);
      return;
    }

    try {
      const response = await apiService.getWorkouts(programId);
      setWorkouts(response.data);
    } catch (err) {
      if (!err.status === 404) {
        alert("Failed to retrieve workouts");
      }
      console.error("Failed to retrieve workouts:", err.message);
    }
    setIsOpen(true);
  };

  const viewExercises = async (programId, workoutId) => {
    if (currWorkoutId === workoutId) {
      setCurrWorkoutId(null);
      setExercises([]);
      return;
    }
    try {
      const response = await apiService.getWorkoutExercises(programId, workoutId);
      setExercises(response.data);
    } catch (err) {
      if (!err.status === 404) {
        alert("Failed to retrieve workout exercises");
      }
      console.error("Failed to retrieve workout exercises:", err.message);
    }
    setCurrWorkoutId(workoutId);
  };

  const handleDeletion = async (programId) => {
    deleteProgram(programId);
    setConfirmedDelete(false);

  };

  return (
    <div key={program.program_id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{program.name}</h3>
        {!confirmedDelete ? (
          <button
            onClick={() => { setConfirmedDelete(true) }}
            style={{ color: '#ff4d4d', cursor: 'pointer', border: 'none', background: 'none' }}
          >
            Delete
          </button>
        ) : (
          <div style={{ backgroundColor: '#fff0f0', padding: '5px', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.8rem', marginRight: '8px' }}>Confirm?</span>
            <button
              onClick={() => handleDeletion(program.program_id)}
              style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', marginRight: '5px' }}
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmedDelete(false)}
              style={{ border: '1px solid #ccc', borderRadius: '4px' }}
            >
              No
            </button>
          </div>
        )}
      </div>
      <button onClick={() => viewWorkouts(program.program_id)}>
        {isOpen ? "Close" : "View Workouts"}
      </button>
      <p>{program.notes}</p>
      {isOpen &&
        <div className="workoutDetails">
          {workouts.length > 0 ? (
            workouts.map((w) => (
              <div key={w.workout_id}>
                <h5>{w.name}: {w.notes}</h5>
                <button onClick={() => viewExercises(program.program_id, w.workout_id)}>
                  {currWorkoutId === w.workout_id ? "Close" : "View Workout Details"}
                </button>
                {currWorkoutId === w.workout_id &&
                  <div className="exerciseDetails">
                    {exercises.length > 0 ? (
                      exercises.map((e) => (
                        <p key={e.exercise_id}>
                          {e.name}: {e.target_sets} sets x {e.target_reps} reps - {e.rest}s rest
                        </p>
                      ))
                    ) : (
                      <p>No workout data found</p>
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
  );

};

export default ProgramCard;
