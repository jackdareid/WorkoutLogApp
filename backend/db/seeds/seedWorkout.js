import {
  createWorkout,
  createWorkoutExercises,
  createCompletedWorkout,
  createCompletedExercise,
  createCompletedSet,
} from "./queries/inputQueries.js";

// (async () => {
//   const res_1 = await createWorkout(
//     1,
//     1,
//     "Practical",
//     "This is a practical test",
//   );
//   console.log(res_1);
// })();

// async () => {
//   const res = await createWorkoutExercises(
//     1,
//     3,
//     1,
//     2,
//     10,
//     90,
//     "FALSE",
//     0,
//     "No notes",
//   );
//
//   const res_2 = await createWorkoutExercises(
//     2,
//     3,
//     2,
//     2,
//     10,
//     90,
//     "FALSE",
//     0,
//     "No notes",
//   );
//   const res_3 = await createWorkoutExercises(
//     (exercise_id = 3),
//     (workout_id = 3),
//     (order_index = 3),
//     (sets = 3),
//     (reps = 3),
//     (rest = 90),
//     (time_f = "FALSE"),
//     (distance = 0),
//     (notes = "ANYTHING"),
//   );
// };

// (async () => {
//   const res = createCompletedWorkout(1, 3, "No notes!!");
// })();

// (async () => {
//   const res_1 = createCompletedExercise(1, 1, 2, "FALSE", "Is santa real?");
//   const res_3 = createCompletedExercise(1, 2, 2, "FALSE", "PR");
//   const res_5 = createCompletedExercise(1, 3, 2, "FALSE", "Itchy bum");
// })();

(async () => {
  const set_1 = await createCompletedSet(2, 100, 10, 6, 1);
  const set_2 = await createCompletedSet(2, 135, 8, 7, 2);
  const set_3 = await createCompletedSet(3, 90, 10, 1, 1);
  const set_4 = await createCompletedSet(3, 200, 10, 2, 2);
  const set_5 = await createCompletedSet(4, 300, 10, 3, 1);
  const set_6 = await createCompletedSet(4, 400, 10, 7, 2);
})();
