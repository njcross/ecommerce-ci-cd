// // ViewExercises.tsx
// import React from 'react';
// import { useSelector } from 'react-redux';
// import DeleteExercise from './DeleteExercise';
// import type { RootState } from '../store';

// const ViewExercises: React.FC = () => {
//   const exercises = useSelector((state: RootState) => state.exercises.exercises);

//   return (
//     <div>
//       {exercises.map((exercise) => (
//         <div key={exercise.id}>
//           <p>{`${exercise.type} - ${exercise.duration} minutes - ${exercise.calories} kcal`}</p>
//           <DeleteExercise id={exercise.id} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ViewExercises;
