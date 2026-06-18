// controllers/workoutController.js
const {
  createWorkout,
  createUserExercise,
  createWorkoutExercises,
} = require("../db/queries/inputQueries.js");

const {
  getExerciseById,
  getExerciseByName,
} = require("../db/queries/retrievalQueries.js");

const createWorkoutShell = async (user_id, workout_name, workout_notes) => {
  const shell = await createWorkout(user_id, workout_name, workout_notes);
  // Check if shell isn't correct or whatever
  return shell;
};

const linkWorkoutExercises = async (user_id, w_id, exercises) => {
  for (let i = 0; i < exercises.length; i++) {
    const { name, target_sets, target_reps, target_rest } = exercises[i];
    console.log("Processing exercise payload item:", exercises[i]);

    let exercise = await getExerciseByName(name);
    // console.log(`Final exercise id = ${finalExerciseId}`);
    if (!exercise) {
      exercise = await createExercise(user_id, name);
    }
    console.log(`Exercise: ${exercise}, exercise_id: ${exercise.exercise_id}`);

    await createWorkoutExercises({
      exercise_id: exercise.exercise_id,
      workout_id: w_id,
      order_index: i + 1,
      target_sets,
      target_reps,
      target_weight: 0,
      target_duration: 0,
      target_rest,
      time_f: false,
      distance: 0,
      notes: "None",
    });
  }
};

const createExercise = async (user_id, exercise_name) => {
  console.log(`User id: ${user_id}, exercise name: ${exercise_name}`);
  try {
    const exercise = await createUserExercise(user_id, exercise_name);
    return exercise;
  } catch (err) {
    console.error(`Database error: ${err.message}`);
    throw err;
  }
};

const compileWorkout = async (user_id, workouts) => {
  console.log("Compile workout user_id: ", user_id);
  const workout_ids = [];
  for (const w of workouts) {
    console.log("Compiling workout routine row: ", w.name);

    const w_shell = await createWorkoutShell(user_id, w.name, w.notes);
    workout_ids.push(w_shell.workout_id);
    console.log("Workout ids: ", workout_ids);

    await linkWorkoutExercises(user_id, w_shell.workout_id, w.exercises);
  }

  return workout_ids;
};

module.exports = compileWorkout;
