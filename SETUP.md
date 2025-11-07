# SavingsTracker - Quick Setup Guide

## Installation Commands

Copy and paste these commands in order:

### 1. Navigate to project directory
```bash
cd C:\Users\Kelvin_Ohm\CascadeProjects\SavingsTracker
```

### 2. Install Expo dependencies
```bash
npx expo install expo expo-status-bar react react-native
npx expo install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-paper react-native-vector-icons
npx expo install react-native-chart-kit react-native-svg
npx expo install @react-native-async-storage/async-storage
npx expo install date-fns
```

### 3. Install npm packages
```bash
npm install formik yup
npm install --save-dev typescript @types/react @types/react-native @types/jest jest babel-jest
npm install @react-navigation/native-stack
```

### 4. Start the development server
```bash
npx expo start
```

## What to expect

After running `npx expo start`, you'll see:
- A QR code in your terminal
- Options to open in iOS simulator, Android emulator, or web browser
- Development server running on http://localhost:8081

## Testing the app

Scan the QR code with:
- **iOS**: Camera app (opens Expo Go automatically)
- **Android**: Expo Go app

Or press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser

## Running tests

```bash
npm test
```

## Troubleshooting

### Missing dependencies
If you see module errors, run:
```bash
npm install
npx expo install --fix
```

### Clear cache
If the app won't load:
```bash
npx expo start -c
```

### TypeScript errors
Ensure all types are installed:
```bash
npm install --save-dev @types/react @types/react-native
```

## Next Steps

1. Set your annual savings target in Settings
2. Add your first contribution from the Home screen
3. Watch your progress grow with beautiful charts!

## VSCode Debugging (Optional)

Copy `launch.json.example` to `.vscode/launch.json` and install the React Native Tools extension for VSCode debugging support.
