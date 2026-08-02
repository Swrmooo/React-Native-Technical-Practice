import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useFavorites } from '../context/FavoritesContext';
import { ProductsStackParamList } from '../navigation/types';
import { formatPrice } from '../utils/formatPrice';

type Props = NativeStackScreenProps<
  ProductsStackParamList,
  'ProductDetail'
>;

export function ProductDetailScreen({ route }: Props) {
  const { product } = route.params;
  const {
    addFavorite,
    isFavorite,
    isHydrated,
    removeFavorite,
  } = useFavorites();
  const isProductFavorite = isFavorite(product.id);
  const favoriteScale = useRef(new Animated.Value(1)).current;

  const handleFavoritePress = () => {
    if (!isHydrated) {
      return;
    }

    favoriteScale.stopAnimation();
    Animated.sequence([
      Animated.timing(favoriteScale, {
        toValue: 0.82,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.spring(favoriteScale, {
        toValue: 1,
        speed: 20,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();

    if (isProductFavorite) {
      removeFavorite(product.id);
      return;
    }

    addFavorite(product);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
          accessible
          accessibilityLabel={`Product image for ${product.title}`}
        />
      </View>

      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title} accessibilityRole="header">
        {product.title}
      </Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>

      {product.rating ? (
        <View
          style={styles.rating}
          accessible
          accessibilityLabel={`${product.rating.rate.toFixed(1)} out of 5 stars from ${product.rating.count} ratings`}
        >
          <Ionicons name="star" size={20} color="#f59e0b" />
          <Text style={styles.ratingText}>
            {product.rating.rate.toFixed(1)} · {product.rating.count} ratings
          </Text>
        </View>
      ) : null}

      <Pressable
        style={({ pressed }) => [
          styles.favoriteButton,
          isProductFavorite && styles.favoriteButtonActive,
          !isHydrated && styles.favoriteButtonDisabled,
          pressed && styles.favoriteButtonPressed,
        ]}
        onPress={handleFavoritePress}
        disabled={!isHydrated}
        accessibilityRole="button"
        accessibilityState={{
          disabled: !isHydrated,
          selected: isProductFavorite,
        }}
        accessibilityLabel={
          !isHydrated
            ? 'Favorites are loading'
            : isProductFavorite
            ? `Remove ${product.title} from favorites`
            : `Add ${product.title} to favorites`
        }
      >
        <Animated.View
          style={{ transform: [{ scale: favoriteScale }] }}
        >
          <Ionicons
            name={isProductFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={
              !isHydrated
                ? '#94a3b8'
                : isProductFavorite
                  ? '#ffffff'
                  : '#e11d48'
            }
            accessible={false}
          />
        </Animated.View>
        <Text
          style={[
            styles.favoriteButtonText,
            isProductFavorite && styles.favoriteButtonTextActive,
            !isHydrated && styles.favoriteButtonTextDisabled,
          ]}
        >
          {!isHydrated
            ? 'Loading Favorites...'
            : isProductFavorite
            ? 'Remove from Favorites'
            : 'Add to Favorites'}
        </Text>
      </Pressable>

      <View style={styles.divider} />
      <Text style={styles.sectionTitle} accessibilityRole="header">
        Description
      </Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 32,
  },
  imageContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  category: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    borderRadius: 999,
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: '#1d4ed8',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  title: {
    color: '#0f172a',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 34,
  },
  price: {
    marginTop: 14,
    color: '#2563eb',
    fontSize: 24,
    fontWeight: '700',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 14,
  },
  ratingText: {
    marginLeft: 6,
    color: '#475569',
    fontSize: 15,
    fontWeight: '500',
  },
  favoriteButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#e11d48',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  favoriteButtonActive: {
    backgroundColor: '#e11d48',
  },
  favoriteButtonDisabled: {
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
  },
  favoriteButtonPressed: {
    opacity: 0.75,
  },
  favoriteButtonText: {
    marginLeft: 8,
    color: '#e11d48',
    fontSize: 16,
    fontWeight: '700',
  },
  favoriteButtonTextActive: {
    color: '#ffffff',
  },
  favoriteButtonTextDisabled: {
    color: '#94a3b8',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 24,
    backgroundColor: '#cbd5e1',
  },
  sectionTitle: {
    marginBottom: 10,
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 25,
  },
});
