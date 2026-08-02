import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FavoritesProvider } from './src/context/FavoritesContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
