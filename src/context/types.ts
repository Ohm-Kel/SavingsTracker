/**
 * Core TypeScript interfaces for the SavingsTracker app
 */

export interface Contribution {
  id: string;
  date: string; // ISO date string
  amount: number;
  note?: string;
}

export interface Settings {
  theme: 'light' | 'dark';
}

export interface State {
  target: number; // Annual savings target
  contributions: Contribution[];
  settings: Settings;
}

export type Action =
  | { type: 'SET_TARGET'; payload: number }
  | { type: 'ADD_CONTRIBUTION'; payload: Contribution }
  | { type: 'EDIT_CONTRIBUTION'; payload: { id: string; updates: Partial<Contribution> } }
  | { type: 'DELETE_CONTRIBUTION'; payload: string }
  | { type: 'LOAD_STATE'; payload: State }
  | { type: 'TOGGLE_THEME' }
  | { type: 'RESET' };
