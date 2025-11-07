/**
 * Pure reducer function for managing savings state
 * All state mutations flow through this reducer
 */

import { State, Action } from './types';

export const initialState: State = {
  target: 0,
  contributions: [],
  settings: {
    theme: 'light',
  },
};

export function savingsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TARGET':
      return {
        ...state,
        target: action.payload,
      };

    case 'ADD_CONTRIBUTION':
      return {
        ...state,
        contributions: [...state.contributions, action.payload],
      };

    case 'EDIT_CONTRIBUTION':
      return {
        ...state,
        contributions: state.contributions.map((contribution) =>
          contribution.id === action.payload.id
            ? { ...contribution, ...action.payload.updates }
            : contribution
        ),
      };

    case 'DELETE_CONTRIBUTION':
      return {
        ...state,
        contributions: state.contributions.filter(
          (contribution) => contribution.id !== action.payload
        ),
      };

    case 'LOAD_STATE':
      return action.payload;

    case 'TOGGLE_THEME':
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: state.settings.theme === 'light' ? 'dark' : 'light',
        },
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}
