/**
 * Settings screen - Theme toggle and target management
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Switch, Divider, Button, Card, Text } from 'react-native-paper';
import { useSavings } from '../context/SavingsContext';
import { formatCurrency } from '../utils/format';
import { useNavigation } from '@react-navigation/native';

export function SettingsScreen() {
  const { state, dispatch } = useSavings();
  const navigation = useNavigation();

  const handleToggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      dispatch({ type: 'RESET' });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Appearance
          </Text>
          <List.Item
            title="Dark Mode"
            description="Toggle between light and dark theme"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch value={state.settings.theme === 'dark'} onValueChange={handleToggleTheme} />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Savings Target
          </Text>
          <List.Item
            title="Annual Target"
            description={
              state.target > 0 ? formatCurrency(state.target) : 'Not set'
            }
            left={(props) => <List.Icon {...props} icon="target" />}
            onPress={() => navigation.navigate('TargetSetup' as never)}
          />
          <Divider />
          <List.Item
            title="Total Contributions"
            description={`${state.contributions.length} contribution${
              state.contributions.length !== 1 ? 's' : ''
            }`}
            left={(props) => <List.Icon {...props} icon="cash-multiple" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Data Management
          </Text>
          <Text variant="bodyMedium" style={styles.warningText}>
            All data is stored locally on your device. Uninstalling the app will delete all data.
          </Text>
          <Button
            mode="outlined"
            onPress={handleReset}
            style={styles.resetButton}
            textColor="#B00020"
            accessibilityLabel="Reset all data"
          >
            Reset All Data
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.footerText}>
          SavingsTracker v1.0.0
        </Text>
        <Text variant="bodySmall" style={styles.footerText}>
          Built with Expo & React Native
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  warningText: {
    marginTop: 8,
    marginBottom: 16,
    opacity: 0.7,
  },
  resetButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  footerText: {
    opacity: 0.5,
    marginVertical: 2,
  },
});
