/**
 * Target setup screen - Form to set annual savings target
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Card, useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSavings } from '../context/SavingsContext';
import { formatCurrency } from '../utils/format';
import { calculateMonthlyTarget } from '../utils/calculations';
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  target: Yup.number()
    .required('Target is required')
    .positive('Target must be positive')
    .typeError('Target must be a number'),
});

export function TargetSetupScreen() {
  const { state, dispatch } = useSavings();
  const theme = useTheme();
  const navigation = useNavigation();

  const handleSubmit = (values: { target: string }) => {
    const targetAmount = parseFloat(values.target);
    dispatch({
      type: 'SET_TARGET',
      payload: targetAmount,
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Set Your Annual Savings Target
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            Enter the total amount you want to save this year. We'll help you track your progress
            month by month.
          </Text>

          <Formik
            initialValues={{ target: state.target > 0 ? state.target.toString() : '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <TextInput
                  label="Annual Target"
                  value={values.target}
                  onChangeText={handleChange('target')}
                  onBlur={handleBlur('target')}
                  mode="outlined"
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="10000"
                  error={touched.target && !!errors.target}
                  accessibilityLabel="Annual savings target"
                  left={<TextInput.Affix text="$" />}
                />
                {touched.target && errors.target && (
                  <Text style={styles.errorText}>{errors.target}</Text>
                )}

                {values.target && !errors.target && parseFloat(values.target) > 0 && (
                  <View style={styles.previewContainer}>
                    <Text variant="bodyMedium" style={styles.previewLabel}>
                      Monthly Target:
                    </Text>
                    <Text
                      variant="titleLarge"
                      style={[styles.previewValue, { color: theme.colors.primary }]}
                    >
                      {formatCurrency(calculateMonthlyTarget(parseFloat(values.target)))}
                    </Text>
                  </View>
                )}

                <Button
                  mode="contained"
                  onPress={() => handleSubmit()}
                  style={styles.button}
                  accessibilityLabel="Save target"
                >
                  Save Target
                </Button>
              </View>
            )}
          </Formik>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    elevation: 4,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 24,
    opacity: 0.7,
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
  previewContainer: {
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
  },
  previewLabel: {
    marginBottom: 4,
    opacity: 0.7,
  },
  previewValue: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 16,
  },
});
