# Product Favorites App

A small Expo React Native application built for a technical assessment. It
loads products from the [Fake Store API](https://fakestoreapi.com/), provides
typed product-detail navigation, and lets users save favorites locally.

## Tech Stack

- Expo SDK 54
- React Native 0.81
- React 19.1
- TypeScript
- React Navigation
- React Context with `useReducer`
- AsyncStorage

## Requirements

- Node.js 20.19.4 or newer
- npm
- Expo Go installed on an iOS or Android device
- An internet connection for loading products

## Setup and Run

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Connect the computer and mobile device to the same network, then scan the QR
code with Expo Go.

If the device cannot connect over the local network, try:

```bash
npx expo start --tunnel
```

Other available commands:

```bash
npm run android
npm run ios
npm run web
```

## Reviewer Test Flow

1. Open the app and confirm the product list loads.
2. Pull down on the list to refresh the products.
3. Select a product and confirm its image, title, category, price,
   description, and rating are displayed.
4. Add the product to favorites and confirm the button changes to the active
   state.
5. Open the **Favorites** tab and confirm the product appears.
6. Switch between tabs and navigate back and forth; the favorite should remain.
7. Remove the product from favorites and confirm the empty state appears when
   no favorites remain.
8. Add a favorite again, fully close Expo Go, reopen the project, and confirm
   the saved favorite is restored.

The loading, error, retry, and empty states can also be reviewed by temporarily
disabling the device network or by making the API return no products.

## Features

- Product list rendered with `FlatList`
- Loading, error, retry, empty, and pull-to-refresh states
- Reusable product cards with consistent USD price formatting
- Product detail screen with typed navigation
- Product image, category, description, price, and optional rating details
- Favorites managed globally with React Context and `useReducer`
- Duplicate favorite prevention and item removal
- Favorites list and empty state
- AsyncStorage persistence with guarded hydration
- Safe-area support for iOS and Android
- Accessible labels and clear active favorite states
- Small favorite-button animation

## Architecture

The project uses a small, practical feature structure:

```text
src/
  api/          Product API request
  components/   Reusable UI components and shared screen states
  context/      Favorites state, reducer, and AsyncStorage persistence
  navigation/   Typed stack and bottom-tab navigation
  screens/      Product list, product detail, and favorites screens
  types/        Shared product and navigation types
  utils/        Shared price formatting
```

React Navigation combines a bottom-tab navigator with a native stack for the
product flow. Favorites live above navigation in `FavoritesContext`, so they
remain available while moving between screens and tabs.

Persistence is intentionally guarded: saved favorites are loaded first, and
AsyncStorage writes begin only after hydration finishes. This prevents an empty
initial state from overwriting previously saved favorites.

## Validation

Run the following commands before reviewing or submitting:

```bash
npm run typecheck
npx expo install --check
npx expo-doctor
```

## Notes

- Product data comes from a public external API, so initial loading depends on
  the API and network availability.
- Favorites are stored only on the current device using AsyncStorage.
- No UI framework or external state-management library is used.
