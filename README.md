# SavingsTracker

A production-ready, single-user personal savings tracker built with Expo (managed workflow), TypeScript, and React Native. Track your annual savings goals, add monthly contributions, and visualize your progress with beautiful charts.

## Features

- 📊 **Visual Progress Tracking** - Line and bar charts showing monthly trends
- 💰 **Contribution Management** - Add, edit, and delete contributions with notes
- 🎯 **Target Setting** - Set annual savings targets with automatic monthly breakdown
- 🌓 **Theme Support** - Light/dark mode with Material Design 3
- 💾 **Local Persistence** - All data stored locally with AsyncStorage
- 📱 **Responsive UI** - Clean, accessible interface with react-native-paper

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Expo Go app on your mobile device (iOS/Android)

### Installation

```bash
# 1. Navigate to the project directory
cd SavingsTracker

# 2. Install dependencies using Expo
npx expo install expo expo-status-bar react react-native
npx expo install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-paper react-native-vector-icons
npx expo install react-native-chart-kit react-native-svg
npx expo install @react-native-async-storage/async-storage
npx expo install date-fns

# 3. Install additional npm packages
npm install formik yup

# 4. Install TypeScript types
npm install --save-dev typescript @types/react @types/react-native

# 5. Start the development server
npx expo start
```

### Running the App

After running `npx expo start`, you'll see a QR code in your terminal:

- **iOS**: Scan with Camera app, opens in Expo Go
- **Android**: Scan with Expo Go app
- **Web**: Press `w` to open in browser (limited chart support)

## Testing

Run the reducer unit tests:

```bash
npm test
```

The test suite validates core state management logic including:
- Setting savings targets
- Adding/editing/deleting contributions
- State persistence and reset functionality

## Project Structure

```
SavingsTracker/
├── App.tsx                          # Root component with providers
├── src/
│   ├── navigation/
│   │   └── RootNavigator.tsx        # Bottom tab navigation
│   ├── context/
│   │   ├── SavingsContext.tsx       # Global state provider
│   │   ├── savingsReducer.ts        # State reducer logic
│   │   └── types.ts                 # TypeScript interfaces
│   ├── screens/
│   │   ├── HomeScreen.tsx           # Dashboard with charts
│   │   ├── ContributionsScreen.tsx  # List all contributions
│   │   ├── SettingsScreen.tsx       # Theme & target settings
│   │   └── TargetSetupScreen.tsx    # Set annual target
│   ├── components/
│   │   ├── Header.tsx               # Reusable header
│   │   ├── ProgressCard.tsx         # Progress summary card
│   │   ├── ContributionList.tsx     # Contribution items
│   │   ├── AddContributionModal.tsx # Add/edit form modal
│   │   └── Charts/
│   │       └── MonthlyTrendChart.tsx # Line & bar charts
│   ├── storage/
│   │   └── storage.ts               # AsyncStorage wrapper
│   ├── theme/
│   │   └── theme.ts                 # Material 3 themes
│   └── utils/
│       ├── calculations.ts          # Savings calculations
│       └── format.ts                # Number/date formatting
├── tests/
│   └── savingsReducer.test.ts       # Reducer unit tests
└── assets/
    └── app-icon.png                 # App icon placeholder
```

## Key Files Explained

### Core State Management

- **`SavingsContext.tsx`** - Provides global state using Context API + useReducer. Automatically loads state from AsyncStorage on mount and persists changes.
- **`savingsReducer.ts`** - Pure reducer function handling all state mutations (SET_TARGET, ADD_CONTRIBUTION, etc.). Fully tested.
- **`types.ts`** - TypeScript definitions for State, Action, and Contribution interfaces.

### Storage

- **`storage.ts`** - Thin wrapper around AsyncStorage with error handling. Easy to swap for remote sync later.

### Screens

- **`HomeScreen.tsx`** - Main dashboard showing progress card, monthly trend chart, and FAB to add contributions.
- **`ContributionsScreen.tsx`** - Scrollable list of all contributions with edit/delete actions.
- **`SettingsScreen.tsx`** - Theme toggle and link to target setup.
- **`TargetSetupScreen.tsx`** - Formik form to set/update annual savings target.

### Components

- **`ProgressCard.tsx`** - Displays total saved, remaining, and percentage with visual progress bar.
- **`AddContributionModal.tsx`** - Modal form (Formik + Yup) for adding contributions with date picker.
- **`MonthlyTrendChart.tsx`** - Renders line chart (cumulative) and bar chart (monthly totals) using react-native-chart-kit.

### Utilities

- **`calculations.ts`** - Helper functions for computing totals, percentages, monthly breakdowns, and target achievement.
- **`format.ts`** - Currency and date formatting utilities.

## Extending the App

### Future Enhancement Ideas

1. **Cloud Backup** - Replace `storage.ts` with Firebase/Supabase integration
2. **Export Data** - Add CSV export functionality in Settings
3. **Recurring Contributions** - Auto-add monthly contributions
4. **Multiple Goals** - Track separate savings goals simultaneously
5. **Notifications** - Remind users to log monthly contributions
6. **Categories** - Tag contributions by category (emergency fund, vacation, etc.)

### Where to Start

- **Storage layer**: `src/storage/storage.ts` - Add remote sync methods
- **New screens**: Add to `src/screens/` and register in `RootNavigator.tsx`
- **New actions**: Add to `savingsReducer.ts` and update `types.ts`
- **Charts**: Extend `MonthlyTrendChart.tsx` or add new chart components

## Architecture Decisions

- **Context API over Redux** - Simpler for single-user, local-first app
- **AsyncStorage** - No network dependency, instant load times
- **Material 3** - Modern, accessible design system
- **Formik + Yup** - Industry-standard form validation
- **date-fns** - Lightweight date manipulation (vs moment.js)

## Troubleshooting

### Charts not rendering
- Ensure `react-native-svg` is installed: `npx expo install react-native-svg`
- Clear cache: `npx expo start -c`

### TypeScript errors
- Run `npm install` to ensure all type definitions are installed
- Check `tsconfig.json` is present in root

### AsyncStorage warnings
- Normal on first launch (no stored data yet)
- Data persists after first contribution/target set

## License

MIT - Free to use for personal or commercial projects.

## Support

For issues or questions, refer to:
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
