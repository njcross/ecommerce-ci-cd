// DeleteExercise.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteExercise } from './exercisesSlice';

interface DeleteExerciseProps {
  id: string;
}

const DeleteExercise: React.FC<DeleteExerciseProps> = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteExercise(id));
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteExercise;
