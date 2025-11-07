/**
 * Home screen - Main dashboard with progress card, charts, and FAB
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useSavings } from '../context/SavingsContext';
import { ProgressCard } from '../components/ProgressCard';
import { MonthlyTrendChart } from '../components/Charts/MonthlyTrendChart';
import { AddContributionModal } from '../components/AddContributionModal';

export function HomeScreen() {
  const { state, dispatch } = useSavings();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddContribution = (values: { date: string; amount: number; note: string }) => {
    dispatch({
      type: 'ADD_CONTRIBUTION',
      payload: {
        id: Date.now().toString(),
        date: values.date,
        amount: values.amount,
        note: values.note,
      },
    });
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ProgressCard target={state.target} contributions={state.contributions} />
        <MonthlyTrendChart contributions={state.contributions} target={state.target} />
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Add contribution"
      />

      <AddContributionModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onSubmit={handleAddContribution}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
