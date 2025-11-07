/**
 * Progress card showing total saved, remaining, and percentage
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar, useTheme } from 'react-native-paper';
import { formatCurrency } from '../utils/format';
import {
  calculateTotalSaved,
  calculateRemaining,
  calculatePercentComplete,
} from '../utils/calculations';
import { Contribution } from '../context/types';

interface ProgressCardProps {
  target: number;
  contributions: Contribution[];
}

export function ProgressCard({ target, contributions }: ProgressCardProps) {
  const theme = useTheme();
  const totalSaved = calculateTotalSaved(contributions);
  const remaining = calculateRemaining(target, totalSaved);
  const percentComplete = calculatePercentComplete(target, totalSaved);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>
          Savings Progress
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
              {formatCurrency(totalSaved)}
            </Text>
            <Text variant="bodyMedium" style={styles.label}>
              Total Saved
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text variant="headlineMedium">{formatCurrency(remaining)}</Text>
            <Text variant="bodyMedium" style={styles.label}>
              Remaining
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <ProgressBar
            progress={percentComplete / 100}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
          <Text variant="titleMedium" style={styles.percentText}>
            {percentComplete}% Complete
          </Text>
        </View>

        {target > 0 && (
          <Text variant="bodySmall" style={styles.targetText}>
            Annual Target: {formatCurrency(target)}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  label: {
    marginTop: 4,
    opacity: 0.7,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
  },
  percentText: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  targetText: {
    marginTop: 12,
    textAlign: 'center',
    opacity: 0.6,
  },
});
