/**
 * Contributions screen - List all contributions with edit/delete
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useSavings } from '../context/SavingsContext';
import { ContributionList } from '../components/ContributionList';
import { AddContributionModal } from '../components/AddContributionModal';
import { Contribution } from '../context/types';

export function ContributionsScreen() {
  const { state, dispatch } = useSavings();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingContribution, setEditingContribution] = useState<Contribution | undefined>();

  const handleAddContribution = (values: { date: string; amount: number; note: string }) => {
    if (editingContribution) {
      // Edit existing contribution
      dispatch({
        type: 'EDIT_CONTRIBUTION',
        payload: {
          id: editingContribution.id,
          updates: {
            date: values.date,
            amount: values.amount,
            note: values.note,
          },
        },
      });
      setEditingContribution(undefined);
    } else {
      // Add new contribution
      dispatch({
        type: 'ADD_CONTRIBUTION',
        payload: {
          id: Date.now().toString(),
          date: values.date,
          amount: values.amount,
          note: values.note,
        },
      });
    }
  };

  const handleEdit = (contribution: Contribution) => {
    setEditingContribution(contribution);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    dispatch({
      type: 'DELETE_CONTRIBUTION',
      payload: id,
    });
  };

  const handleDismissModal = () => {
    setModalVisible(false);
    setEditingContribution(undefined);
  };

  return (
    <>
      <View style={styles.container}>
        <ContributionList
          contributions={state.contributions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Add contribution"
      />

      <AddContributionModal
        visible={modalVisible}
        onDismiss={handleDismissModal}
        onSubmit={handleAddContribution}
        initialValues={editingContribution}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
