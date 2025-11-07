/**
 * Calculation utilities for savings metrics
 * Pure functions for computing totals, percentages, and monthly breakdowns
 */

import { Contribution } from '../context/types';
import { startOfMonth, format, parseISO } from 'date-fns';

export function calculateTotalSaved(contributions: Contribution[]): number {
  return contributions.reduce((sum, contribution) => sum + contribution.amount, 0);
}

export function calculateRemaining(target: number, totalSaved: number): number {
  return Math.max(0, target - totalSaved);
}

export function calculatePercentComplete(target: number, totalSaved: number): number {
  if (target === 0) return 0;
  return Math.min(100, Math.round((totalSaved / target) * 100));
}

export function calculateMonthlyTarget(annualTarget: number): number {
  return Math.round(annualTarget / 12);
}

/**
 * Returns an array of 12 numbers representing total contributions for each month
 * Index 0 = January, Index 11 = December
 */
export function calculateMonthlyTotals(contributions: Contribution[]): number[] {
  const monthlyTotals = new Array(12).fill(0);

  contributions.forEach((contribution) => {
    try {
      const date = parseISO(contribution.date);
      const monthIndex = date.getMonth(); // 0-11
      monthlyTotals[monthIndex] += contribution.amount;
    } catch (error) {
      console.error('Invalid date format:', contribution.date);
    }
  });

  return monthlyTotals;
}

/**
 * Returns an array of 12 booleans indicating if monthly target was met
 */
export function calculateMonthlyTargetMet(
  contributions: Contribution[],
  annualTarget: number
): boolean[] {
  const monthlyTarget = calculateMonthlyTarget(annualTarget);
  const monthlyTotals = calculateMonthlyTotals(contributions);

  return monthlyTotals.map((total) => total >= monthlyTarget);
}

/**
 * Returns cumulative savings by month for trend chart
 * Returns array of 12 numbers (running total)
 */
export function calculateCumulativeMonthlySavings(contributions: Contribution[]): number[] {
  const monthlyTotals = calculateMonthlyTotals(contributions);
  const cumulative: number[] = [];
  let runningTotal = 0;

  monthlyTotals.forEach((monthTotal) => {
    runningTotal += monthTotal;
    cumulative.push(runningTotal);
  });

  return cumulative;
}

/**
 * Groups contributions by month for display
 */
export interface MonthlyGroup {
  month: string; // e.g., "2024-01"
  contributions: Contribution[];
  total: number;
}

export function groupContributionsByMonth(contributions: Contribution[]): MonthlyGroup[] {
  const groups = new Map<string, Contribution[]>();

  contributions.forEach((contribution) => {
    try {
      const date = parseISO(contribution.date);
      const monthKey = format(startOfMonth(date), 'yyyy-MM');

      if (!groups.has(monthKey)) {
        groups.set(monthKey, []);
      }
      groups.get(monthKey)!.push(contribution);
    } catch (error) {
      console.error('Invalid date format:', contribution.date);
    }
  });

  const result: MonthlyGroup[] = [];
  groups.forEach((contributions, month) => {
    const total = contributions.reduce((sum, c) => sum + c.amount, 0);
    result.push({ month, contributions, total });
  });

  // Sort by month descending (newest first)
  result.sort((a, b) => b.month.localeCompare(a.month));

  return result;
}
