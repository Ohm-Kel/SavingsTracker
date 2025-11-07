# 📁 SavingsTracker - Complete File Index

## 📊 Overview

**Total Files**: 36  
**Lines of Code**: ~4,850  
**Documentation Pages**: 7  
**Test Files**: 1  
**Configuration Files**: 7  

---

## 🗂️ Files by Category

### 📄 Documentation (7 files)

| File | Purpose | Size | Read Time |
|------|---------|------|-----------|
| `START_HERE.md` | Navigation guide | Medium | 3 min |
| `QUICKSTART.txt` | Quick reference | Small | 2 min |
| `README.md` | Main documentation | Large | 15 min |
| `SETUP.md` | Installation guide | Medium | 5 min |
| `PROJECT_SUMMARY.md` | Architecture deep-dive | X-Large | 20 min |
| `VALIDATION_CHECKLIST.md` | Quality verification | Large | 5 min |
| `DELIVERY_SUMMARY.md` | Project overview | Large | 10 min |
| `FILE_INDEX.md` | This file | Small | 2 min |

**Total documentation**: ~2,000 lines

---

### ⚙️ Configuration (7 files)

| File | Purpose | Type |
|------|---------|------|
| `package.json` | Dependencies & scripts | JSON |
| `tsconfig.json` | TypeScript config | JSON |
| `app.json` | Expo configuration | JSON |
| `babel.config.js` | Babel transpiler | JS |
| `.gitignore` | Git exclusions | Text |
| `install.ps1` | Automated installer | PowerShell |
| `launch.json.example` | VSCode debugging | JSON |

---

### 🎨 Application Code (21 files)

#### Root Level (1)
- `App.tsx` - Root component with all providers

#### Context / State Management (3)
- `src/context/types.ts` - TypeScript interfaces
- `src/context/savingsReducer.ts` - Pure reducer function
- `src/context/SavingsContext.tsx` - Global state provider

#### Screens (4)
- `src/screens/HomeScreen.tsx` - Dashboard with charts
- `src/screens/ContributionsScreen.tsx` - List all contributions
- `src/screens/SettingsScreen.tsx` - Settings & theme
- `src/screens/TargetSetupScreen.tsx` - Set annual target

#### Components (6)
- `src/components/Header.tsx` - Reusable header
- `src/components/ProgressCard.tsx` - Progress display
- `src/components/ContributionList.tsx` - List component
- `src/components/AddContributionModal.tsx` - Form modal
- `src/components/Charts/MonthlyTrendChart.tsx` - Line & bar charts

#### Navigation (1)
- `src/navigation/RootNavigator.tsx` - Bottom tabs + stack

#### Storage (1)
- `src/storage/storage.ts` - AsyncStorage wrapper

#### Theme (1)
- `src/theme/theme.ts` - Light/dark themes

#### Utilities (2)
- `src/utils/calculations.ts` - Business logic
- `src/utils/format.ts` - Display formatting

---

### 🧪 Tests (1 file)

| File | Tests | Coverage |
|------|-------|----------|
| `tests/savingsReducer.test.ts` | 10 test cases | Reducer: 100% |

---

### 🔧 CI/CD (1 file)

| File | Purpose | Platform |
|------|---------|----------|
| `.github/workflows/test.yml` | Automated testing | GitHub Actions |

---

### 🎨 Assets (1 file)

| File | Type | Status |
|------|------|--------|
| `assets/app-icon.png` | Image | Placeholder (replace before publishing) |

---

## 📈 File Statistics

### By File Type

| Type | Count | Purpose |
|------|-------|---------|
| `.tsx` | 14 | React components |
| `.ts` | 6 | TypeScript modules |
| `.md` | 7 | Documentation |
| `.json` | 4 | Configuration |
| `.js` | 1 | Babel config |
| `.yml` | 1 | CI/CD |
| `.ps1` | 1 | Installer |
| `.txt` | 1 | Quick reference |
| `.png` | 1 | App icon |

### By Directory

| Directory | Files | Purpose |
|-----------|-------|---------|
| Root | 15 | Config & docs |
| `src/` | 20 | Application code |
| `src/context/` | 3 | State management |
| `src/screens/` | 4 | App screens |
| `src/components/` | 6 | UI components |
| `src/navigation/` | 1 | Navigation |
| `src/storage/` | 1 | Persistence |
| `src/theme/` | 1 | Theming |
| `src/utils/` | 2 | Utilities |
| `tests/` | 1 | Unit tests |
| `.github/workflows/` | 1 | CI/CD |
| `assets/` | 1 | Images |

---

## 🎯 Critical Files (Must Read)

### For Setup
1. `START_HERE.md` - Begin here
2. `QUICKSTART.txt` - Fastest setup
3. `install.ps1` - Run this script

### For Understanding
1. `README.md` - Features & usage
2. `PROJECT_SUMMARY.md` - Architecture
3. `App.tsx` - Entry point

### For Development
1. `src/context/types.ts` - Type definitions
2. `src/context/savingsReducer.ts` - State logic
3. `src/utils/calculations.ts` - Business logic

---

## 📚 Reading Recommendations

### First Time Users
```
START_HERE.md → QUICKSTART.txt → Run app → README.md
```

### Developers Extending the App
```
README.md → PROJECT_SUMMARY.md → Source code
```

### Code Reviewers
```
DELIVERY_SUMMARY.md → VALIDATION_CHECKLIST.md → Source code → Tests
```

---

## 🔍 Find Files by Purpose

### Need to understand state management?
→ `src/context/SavingsContext.tsx`  
→ `src/context/savingsReducer.ts`  
→ `src/context/types.ts`

### Need to modify UI?
→ `src/components/` (all files)  
→ `src/theme/theme.ts`

### Need to add a screen?
→ `src/screens/` (see examples)  
→ `src/navigation/RootNavigator.tsx` (register it)

### Need to change business logic?
→ `src/utils/calculations.ts`  
→ `src/utils/format.ts`

### Need to modify storage?
→ `src/storage/storage.ts`

### Need to add tests?
→ `tests/savingsReducer.test.ts` (see examples)

---

## 🎨 Component Dependency Tree

```
App.tsx
├── SavingsProvider (SavingsContext.tsx)
│   └── Uses: savingsReducer.ts, types.ts, storage.ts
├── PaperProvider (theme.ts)
└── NavigationContainer
    └── RootNavigator.tsx
        ├── HomeScreen.tsx
        │   ├── ProgressCard.tsx
        │   │   └── Uses: calculations.ts, format.ts
        │   ├── MonthlyTrendChart.tsx
        │   │   └── Uses: calculations.ts, format.ts
        │   └── AddContributionModal.tsx
        │       └── Uses: Formik, Yup
        ├── ContributionsScreen.tsx
        │   ├── ContributionList.tsx
        │   │   └── Uses: format.ts
        │   └── AddContributionModal.tsx
        ├── SettingsScreen.tsx
        └── TargetSetupScreen.tsx
            └── Uses: Formik, Yup, calculations.ts
```

---

## 🔗 File Relationships

### State Flow
```
User Action
    ↓
Component (dispatch)
    ↓
SavingsContext
    ↓
savingsReducer
    ↓
New State
    ↓
storage.ts (auto-save)
    ↓
AsyncStorage
```

### Data Flow
```
AsyncStorage
    ↓
storage.ts (load)
    ↓
SavingsContext (LOAD_STATE)
    ↓
Components (useSavings hook)
    ↓
calculations.ts (compute metrics)
    ↓
format.ts (display)
    ↓
UI
```

---

## 📝 File Modification Guide

### To Change Theme Colors
1. Edit `src/theme/theme.ts`
2. Modify `lightTheme.colors` or `darkTheme.colors`

### To Add a New Screen
1. Create file in `src/screens/`
2. Register in `src/navigation/RootNavigator.tsx`
3. Add navigation types if needed

### To Add State
1. Update `src/context/types.ts` (add to State interface)
2. Update `src/context/savingsReducer.ts` (add action)
3. Use in components via `useSavings()`

### To Add Calculation
1. Add function to `src/utils/calculations.ts`
2. Add tests to `tests/savingsReducer.test.ts` (if pure)
3. Use in components

### To Modify Storage
1. Edit `src/storage/storage.ts`
2. Keep interface consistent (loadState/saveState)
3. Test persistence

---

## 🎯 Quick File Lookup

| I want to... | Edit this file |
|--------------|----------------|
| Change app colors | `src/theme/theme.ts` |
| Add a screen | `src/screens/[NewScreen].tsx` |
| Modify state shape | `src/context/types.ts` |
| Add state action | `src/context/savingsReducer.ts` |
| Change calculations | `src/utils/calculations.ts` |
| Modify formatting | `src/utils/format.ts` |
| Update storage | `src/storage/storage.ts` |
| Add component | `src/components/[NewComponent].tsx` |
| Change navigation | `src/navigation/RootNavigator.tsx` |
| Add dependencies | `package.json` |
| Configure TypeScript | `tsconfig.json` |
| Configure Expo | `app.json` |

---

## 📊 Code Metrics

### Complexity
- **Low**: Utilities, formatting, storage
- **Medium**: Components, screens
- **High**: State management, navigation

### Maintainability
- **Excellent**: Pure functions, typed code
- **Good**: Components with clear props
- **Fair**: Navigation (React Navigation complexity)

### Testability
- **Excellent**: Reducer, calculations
- **Good**: Components (ready for testing)
- **Fair**: Navigation, storage (integration tests needed)

---

## 🚀 Getting Started Paths

### Path 1: Run First, Learn Later
```
install.ps1 → npx expo start → Explore app → Read docs
```

### Path 2: Learn First, Run Later
```
START_HERE.md → README.md → install.ps1 → npx expo start
```

### Path 3: Deep Dive
```
DELIVERY_SUMMARY.md → PROJECT_SUMMARY.md → Source code → Tests
```

---

## ✅ File Checklist

Before modifying, ensure you've read:
- [ ] `START_HERE.md` - Navigation
- [ ] `README.md` - Features
- [ ] `PROJECT_SUMMARY.md` - Architecture
- [ ] Relevant source files

Before deploying, ensure you've:
- [ ] Replaced `assets/app-icon.png`
- [ ] Updated `app.json` bundle IDs
- [ ] Run `npm test`
- [ ] Tested on physical device

---

## 📞 Need Help Finding Something?

**Can't find a file?**
→ Use your IDE's file search (Ctrl+P / Cmd+P)

**Don't know which file to edit?**
→ Check "Quick File Lookup" table above

**Want to understand file relationships?**
→ See "Component Dependency Tree" section

**Need to add a feature?**
→ Read `PROJECT_SUMMARY.md` → Extension Points

---

**Last Updated**: November 7, 2025  
**Total Files**: 36  
**Status**: ✅ Complete

---

*This index is your map to the SavingsTracker codebase. Happy exploring! 🗺️*
