import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import exercisesReducer from './exercisesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    exercises: exercisesReducer, // ✅ ensure this line is included
  },
});

// 👇 Correct RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; // This line is not needed in the latest Redux Toolkit versions
