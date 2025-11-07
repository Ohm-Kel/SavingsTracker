/**
 * Unit tests for savingsReducer
 * Tests core state management logic
 */

import { savingsReducer, initialState } from '../src/context/savingsReducer';
import { State, Action } from '../src/context/types';

describe('savingsReducer', () => {
  test('should return initial state', () => {
    const state = savingsReducer(initialState, { type: 'RESET' });
    expect(state).toEqual(initialState);
  });

  test('SET_TARGET should update target', () => {
    const action: Action = { type: 'SET_TARGET', payload: 10000 };
    const state = savingsReducer(initialState, action);
    expect(state.target).toBe(10000);
  });

  test('ADD_CONTRIBUTION should add a contribution', () => {
    const contribution = {
      id: '1',
      date: '2024-01-15',
      amount: 500,
      note: 'Test contribution',
    };
    const action: Action = { type: 'ADD_CONTRIBUTION', payload: contribution };
    const state = savingsReducer(initialState, action);

    expect(state.contributions).toHaveLength(1);
    expect(state.contributions[0]).toEqual(contribution);
  });

  test('ADD_CONTRIBUTION should increment list length', () => {
    let state = initialState;
    
    const contribution1 = {
      id: '1',
      date: '2024-01-15',
      amount: 500,
      note: 'First',
    };
    state = savingsReducer(state, { type: 'ADD_CONTRIBUTION', payload: contribution1 });
    expect(state.contributions).toHaveLength(1);

    const contribution2 = {
      id: '2',
      date: '2024-02-15',
      amount: 300,
      note: 'Second',
    };
    state = savingsReducer(state, { type: 'ADD_CONTRIBUTION', payload: contribution2 });
    expect(state.contributions).toHaveLength(2);
  });

  test('EDIT_CONTRIBUTION should update a contribution', () => {
    const contribution = {
      id: '1',
      date: '2024-01-15',
      amount: 500,
      note: 'Original',
    };
    let state = savingsReducer(initialState, { type: 'ADD_CONTRIBUTION', payload: contribution });

    const editAction: Action = {
      type: 'EDIT_CONTRIBUTION',
      payload: {
        id: '1',
        updates: { amount: 600, note: 'Updated' },
      },
    };
    state = savingsReducer(state, editAction);

    expect(state.contributions[0].amount).toBe(600);
    expect(state.contributions[0].note).toBe('Updated');
    expect(state.contributions[0].date).toBe('2024-01-15'); // Unchanged
  });

  test('DELETE_CONTRIBUTION should remove a contribution', () => {
    const contribution1 = {
      id: '1',
      date: '2024-01-15',
      amount: 500,
    };
    const contribution2 = {
      id: '2',
      date: '2024-02-15',
      amount: 300,
    };

    let state = savingsReducer(initialState, { type: 'ADD_CONTRIBUTION', payload: contribution1 });
    state = savingsReducer(state, { type: 'ADD_CONTRIBUTION', payload: contribution2 });
    expect(state.contributions).toHaveLength(2);

    state = savingsReducer(state, { type: 'DELETE_CONTRIBUTION', payload: '1' });
    expect(state.contributions).toHaveLength(1);
    expect(state.contributions[0].id).toBe('2');
  });

  test('LOAD_STATE should replace entire state', () => {
    const newState: State = {
      target: 5000,
      contributions: [
        { id: '1', date: '2024-01-01', amount: 1000 },
      ],
      settings: { theme: 'dark' },
    };

    const state = savingsReducer(initialState, { type: 'LOAD_STATE', payload: newState });
    expect(state).toEqual(newState);
  });

  test('TOGGLE_THEME should switch between light and dark', () => {
    let state = initialState;
    expect(state.settings.theme).toBe('light');

    state = savingsReducer(state, { type: 'TOGGLE_THEME' });
    expect(state.settings.theme).toBe('dark');

    state = savingsReducer(state, { type: 'TOGGLE_THEME' });
    expect(state.settings.theme).toBe('light');
  });

  test('RESET should return to initial state', () => {
    let state: State = {
      target: 10000,
      contributions: [
        { id: '1', date: '2024-01-01', amount: 1000 },
      ],
      settings: { theme: 'dark' },
    };

    state = savingsReducer(state, { type: 'RESET' });
    expect(state).toEqual(initialState);
  });

  test('should handle multiple contributions correctly', () => {
    let state = initialState;
    state = savingsReducer(state, { type: 'SET_TARGET', payload: 12000 });

    for (let i = 1; i <= 5; i++) {
      state = savingsReducer(state, {
        type: 'ADD_CONTRIBUTION',
        payload: {
          id: i.toString(),
          date: `2024-0${i}-01`,
          amount: i * 100,
        },
      });
    }

    expect(state.contributions).toHaveLength(5);
    expect(state.target).toBe(12000);
  });
});
