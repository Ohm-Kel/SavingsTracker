/**
 * Root App component
 * Wraps the app with all necessary providers
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SavingsProvider, useSavings } from './src/context/SavingsContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { lightTheme, darkTheme } from './src/theme/theme';

function AppContent() {
  const { state } = useSavings();
  const theme = state.settings.theme === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style={state.settings.theme === 'dark' ? 'light' : 'dark'} />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SavingsProvider>
      <AppContent />
    </SavingsProvider>
  );
}
