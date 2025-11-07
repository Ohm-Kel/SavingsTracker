/**
 * Modal form for adding/editing contributions
 * Uses Formik + Yup for validation
 */

import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Modal, Portal, Button, TextInput, Text, useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Contribution } from '../context/types';
import { format } from 'date-fns';

interface AddContributionModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (values: { date: string; amount: number; note: string }) => void;
  initialValues?: Contribution;
}

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .typeError('Amount must be a number'),
  date: Yup.string().required('Date is required'),
  note: Yup.string().max(200, 'Note must be less than 200 characters'),
});

export function AddContributionModal({
  visible,
  onDismiss,
  onSubmit,
  initialValues,
}: AddContributionModalProps) {
  const theme = useTheme();
  const isEditing = !!initialValues;

  const defaultValues = {
    date: initialValues?.date || format(new Date(), 'yyyy-MM-dd'),
    amount: initialValues?.amount?.toString() || '',
    note: initialValues?.note || '',
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.surface }]}
      >
        <Text variant="headlineSmall" style={styles.title}>
          {isEditing ? 'Edit Contribution' : 'Add Contribution'}
        </Text>

        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit({
              date: values.date,
              amount: parseFloat(values.amount),
              note: values.note,
            });
            onDismiss();
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextInput
                label="Date"
                value={values.date}
                onChangeText={handleChange('date')}
                onBlur={handleBlur('date')}
                mode="outlined"
                style={styles.input}
                placeholder="YYYY-MM-DD"
                error={touched.date && !!errors.date}
                accessibilityLabel="Contribution date"
              />
              {touched.date && errors.date && (
                <Text style={styles.errorText}>{errors.date}</Text>
              )}

              <TextInput
                label="Amount"
                value={values.amount}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                placeholder="0.00"
                error={touched.amount && !!errors.amount}
                accessibilityLabel="Contribution amount"
              />
              {touched.amount && errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}

              <TextInput
                label="Note (optional)"
                value={values.note}
                onChangeText={handleChange('note')}
                onBlur={handleBlur('note')}
                mode="outlined"
                style={styles.input}
                placeholder="e.g., Bonus, Monthly savings"
                multiline
                numberOfLines={2}
                error={touched.note && !!errors.note}
                accessibilityLabel="Contribution note"
              />
              {touched.note && errors.note && (
                <Text style={styles.errorText}>{errors.note}</Text>
              )}

              <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={onDismiss} style={styles.button}>
                  Cancel
                </Button>
                <Button mode="contained" onPress={() => handleSubmit()} style={styles.button}>
                  {isEditing ? 'Update' : 'Add'}
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 8,
  },
  button: {
    minWidth: 100,
  },
});
