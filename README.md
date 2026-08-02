<<<<<<< Updated upstream
# React-Native-Technical-Practice
React Native – Technical practice
=======
# Product Favorites App

An Expo React Native technical test that displays products from
[Fake Store API](https://fakestoreapi.com/) and lets users save favorites.

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
>>>>>>> Stashed changes
