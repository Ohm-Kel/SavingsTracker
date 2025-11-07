/**
 * List component for displaying contributions with edit/delete actions
 */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, IconButton, Text, Divider, useTheme } from 'react-native-paper';
import { Contribution } from '../context/types';
import { formatCurrency, formatDate } from '../utils/format';

interface ContributionListProps {
  contributions: Contribution[];
  onEdit: (contribution: Contribution) => void;
  onDelete: (id: string) => void;
}

export function ContributionList({ contributions, onEdit, onDelete }: ContributionListProps) {
  const theme = useTheme();

  // Sort contributions by date descending (newest first)
  const sortedContributions = [...contributions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (contributions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyLarge" style={styles.emptyText}>
          No contributions yet
        </Text>
        <Text variant="bodyMedium" style={styles.emptySubtext}>
          Tap the + button to add your first contribution
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Contribution }) => (
    <>
      <List.Item
        title={formatCurrency(item.amount)}
        description={`${formatDate(item.date)}${item.note ? ` • ${item.note}` : ''}`}
        left={(props) => (
          <List.Icon {...props} icon="cash" color={theme.colors.primary} />
        )}
        right={(props) => (
          <View style={styles.actions}>
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => onEdit(item)}
              accessibilityLabel="Edit contribution"
            />
            <IconButton
              icon="delete"
              size={20}
              onPress={() => onDelete(item.id)}
              accessibilityLabel="Delete contribution"
            />
          </View>
        )}
      />
      <Divider />
    </>
  );

  return (
    <FlatList
      data={sortedContributions}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginBottom: 8,
    fontWeight: '600',
  },
  emptySubtext: {
    opacity: 0.6,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
