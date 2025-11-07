/**
 * Formatting utilities for currency and dates
 */

import { format, parseISO } from 'date-fns';

/**
 * Formats a number as currency (USD by default)
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats an ISO date string to readable format
 */
export function formatDate(isoDate: string, formatString: string = 'MMM d, yyyy'): string {
  try {
    const date = parseISO(isoDate);
    return format(date, formatString);
  } catch (error) {
    console.error('Invalid date format:', isoDate);
    return isoDate;
  }
}

/**
 * Formats a month key (YYYY-MM) to readable format
 */
export function formatMonth(monthKey: string): string {
  try {
    const date = parseISO(`${monthKey}-01`);
    return format(date, 'MMMM yyyy');
  } catch (error) {
    console.error('Invalid month format:', monthKey);
    return monthKey;
  }
}

/**
 * Returns short month names for chart labels
 */
export function getMonthLabels(): string[] {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}
