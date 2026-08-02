import Ionicons from '@expo/vector-icons/Ionicons';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ProductCard } from '../components/ProductCard';
import { ScreenState } from '../components/ScreenState';
import { useFavorites } from '../context/FavoritesContext';

export function FavoritesScreen() {
  const { favorites, isHydrated, removeFavorite } = useFavorites();

  if (!isHydrated) {
    return (
      <ScreenState
        title="Loading favorites"
        message="Restoring your saved products."
        isLoading
      />
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <ProductCard product={item} />
          <Pressable
            style={({ pressed }) => [
              styles.removeButton,
              pressed && styles.removeButtonPressed,
            ]}
            onPress={() => removeFavorite(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${item.title} from favorites`}
          >
            <Ionicons
              name="heart-dislike-outline"
              size={20}
              color="#be123c"
            />
            <Text style={styles.removeButtonText}>
              Remove from Favorites
            </Text>
          </Pressable>
        </View>
      )}
      contentContainerStyle={[
        styles.listContent,
        favorites.length === 0 && styles.emptyListContent,
      ]}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <ScreenState
          title="No favorites yet"
          message="Add products from Product Detail and they will appear here."
          iconName="heart-outline"
        />
      }
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      accessibilityLabel="Favorite products"
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#f8fafc',
  },
  emptyListContent: {
    flexGrow: 1,
  },
  removeButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#fda4af',
    borderRadius: 10,
    backgroundColor: '#fff1f2',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  removeButtonPressed: {
    opacity: 0.7,
  },
  removeButtonText: {
    marginLeft: 8,
    color: '#be123c',
    fontSize: 15,
    fontWeight: '600',
  },
  separator: {
    height: 20,
  },
});
