/**
 * Chart components for visualizing savings trends
 * Line chart for cumulative savings, bar chart for monthly contributions
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Contribution } from '../../context/types';
import {
  calculateMonthlyTotals,
  calculateCumulativeMonthlySavings,
} from '../../utils/calculations';
import { getMonthLabels } from '../../utils/format';

interface MonthlyTrendChartProps {
  contributions: Contribution[];
  target: number;
}

export function MonthlyTrendChart({ contributions, target }: MonthlyTrendChartProps) {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;

  const monthLabels = getMonthLabels();
  const monthlyTotals = calculateMonthlyTotals(contributions);
  const cumulativeSavings = calculateCumulativeMonthlySavings(contributions);

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
    labelColor: (opacity = 1) =>
      theme.dark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  if (contributions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyMedium" style={styles.emptyText}>
          Add contributions to see charts
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.chartTitle}>
        Cumulative Savings Trend
      </Text>
      <LineChart
        data={{
          labels: monthLabels,
          datasets: [
            {
              data: cumulativeSavings.length > 0 ? cumulativeSavings : [0],
            },
          ],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withInnerLines={false}
        withOuterLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        fromZero
      />

      <Text variant="titleMedium" style={styles.chartTitle}>
        Monthly Contributions
      </Text>
      <BarChart
        data={{
          labels: monthLabels,
          datasets: [
            {
              data: monthlyTotals.length > 0 ? monthlyTotals : [0],
            },
          ],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        withInnerLines={false}
        fromZero
        showValuesOnTopOfBars
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  chartTitle: {
    marginBottom: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    opacity: 0.6,
  },
});
