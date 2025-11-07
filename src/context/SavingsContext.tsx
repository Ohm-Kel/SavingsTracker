/**
 * Global state provider using Context API + useReducer
 * Automatically loads from AsyncStorage on mount and persists on changes
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { State, Action } from './types';
import { savingsReducer, initialState } from './savingsReducer';
import { loadState, saveState } from '../storage/storage';

interface SavingsContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const SavingsContext = createContext<SavingsContextType | undefined>(undefined);

export function SavingsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(savingsReducer, initialState);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load state from AsyncStorage on mount
  useEffect(() => {
    const loadInitialState = async () => {
      try {
        const savedState = await loadState();
        if (savedState) {
          dispatch({ type: 'LOAD_STATE', payload: savedState });
        }
      } catch (error) {
        console.error('Failed to load state:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadInitialState();
  }, []);

  // Persist state to AsyncStorage whenever it changes (after initial load)
  useEffect(() => {
    if (isLoaded) {
      saveState(state).catch((error) => {
        console.error('Failed to save state:', error);
      });
    }
  }, [state, isLoaded]);

  return (
    <SavingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SavingsContext.Provider>
  );
}

export function useSavings() {
  const context = useContext(SavingsContext);
  if (context === undefined) {
    throw new Error('useSavings must be used within a SavingsProvider');
  }
  return context;
}
