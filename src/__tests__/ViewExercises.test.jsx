// src/__tests__/ViewExercises.test.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import ViewExercises from '../store/ViewExercise';
import DeleteExercise from '../store/DeleteExercise';
import { deleteExercise } from '../store/exercisesSlice';

const mockStore = configureStore([]);

describe('ViewExercises Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      exercises: {
        exercises: [
          { id: '1', type: 'Running', duration: '30', calories: '300' },
          { id: '2', type: 'Cycling', duration: '45', calories: '450' },
        ],
      },
    });
  });

  test('renders exercises list', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ViewExercises />
      </Provider>
    );

    expect(getByText(/Running - 30 minutes - 300 kcal/i)).toBeInTheDocument();
    expect(getByText(/Cycling - 45 minutes - 450 kcal/i)).toBeInTheDocument();
  });

  describe('DeleteExercise Component', () => {
    it('dispatches deleteExercise action with the correct id', () => {
      store.dispatch = jest.fn();
  
      const { getByText } = render(
        <Provider store={store}>
          <DeleteExercise id="1" />
        </Provider>
      );

          // Since redux-mock-store doesn't update the state, you won't be able to verify the UI change directly.
          // Instead, verify the action was dispatched as expected.
          // For UI changes, we should integrate an actual Redux store in our test or manually adjust the mocked store state.
      fireEvent.click(getByText(/delete/i));
      expect(store.dispatch).toHaveBeenCalledWith(deleteExercise("1"));
    });
  });
});