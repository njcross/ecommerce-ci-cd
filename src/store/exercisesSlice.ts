// // exercisesSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const exercisesSlice = createSlice({
//   name: 'exercises',
//   initialState: {
//     exercises: [
//       { id: '1', type: 'Running', duration: '30', calories: '300' },
//       { id: '2', type: 'Cycling', duration: '45', calories: '450' },
//     ],
//   },
//   reducers: {
//     deleteExercise: (state, action) => {
//       state.exercises = state.exercises.filter(
//         (exercise) => exercise.id !== action.payload
//       );
//     },
//   },
// });

// export const { deleteExercise } = exercisesSlice.actions;
// export default exercisesSlice.reducer;
