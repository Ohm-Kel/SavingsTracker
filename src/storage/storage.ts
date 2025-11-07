/**
 * AsyncStorage wrapper for state persistence
 * Handles JSON serialization and error recovery
 * Easy to extend for remote sync later
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { State } from '../context/types';

const STORAGE_KEY = '@savings_state';

export async function loadState(): Promise<State | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue === null) {
      return null;
    }
    return JSON.parse(jsonValue) as State;
  } catch (error) {
    console.error('Error loading state from AsyncStorage:', error);
    return null;
  }
}

export async function saveState(state: State): Promise<void> {
  try {
    const jsonValue = JSON.stringify(state);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving state to AsyncStorage:', error);
    throw error;
  }
}

export async function clearState(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing state from AsyncStorage:', error);
    throw error;
  }
}
