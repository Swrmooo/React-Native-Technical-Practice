An Expo React Native technical test that displays products from
[Fake Store API](https://fakestoreapi.com/) and lets users save favorites.

## Requirements

- Node.js 20.19.4 or newer
- npm
- Expo Go on an iOS or Android device

## Setup

```bash
npm install
```

## Run with Expo Go

```bash
npm start
```

Connect the computer and device to the same network, then scan the QR code
with Expo Go.

Other available commands:

```bash
npm run android
npm run ios
npm run web
```

## Validation

```bash
npm run typecheck
npx expo install --check
npx expo-doctor
```

## Features

- Product list with loading, error, retry, empty, and pull-to-refresh states
- Product cards with images, titles, categories, and USD prices
- Typed navigation to product details
- Product details with rating information when available
- Global favorites managed with React Context and `useReducer`
- Duplicate prevention and removal from favorites
- Favorites tab with an empty state
- AsyncStorage persistence with guarded hydration
- Safe-area handling, accessibility labels, and a small favorite animation

## Architecture

The project stays intentionally small and practical:

- `src/api` contains the product request
- `src/components` contains reusable UI
- `src/context` owns global favorites and persistence
- `src/navigation` contains typed stack and tab navigation
- `src/screens` contains screen-level state and layout
- `src/types` contains product types and validation
- `src/utils` contains shared price formatting

React Navigation provides a bottom tab navigator with a native product stack.
Favorites remain outside screen-local state so they survive navigation, and
storage writes begin only after saved favorites finish hydrating.
