import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Product } from '../types/product';
import { formatPrice } from '../utils/formatPrice';

type ProductCardProps = {
  product: Product;
  onPress?: () => void;
};

export function ProductCard({ product, onPress }: ProductCardProps) {
  const formattedPrice = formatPrice(product.price);

  const content = (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
          accessible={false}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>{formattedPrice}</Text>
      </View>
    </>
  );

  if (!onPress) {
    return (
      <View style={styles.surface}>
        <View style={styles.container}>{content}</View>
      </View>
    );
  }

  return (
    <View style={styles.surface}>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed && styles.containerPressed,
        ]}
        onPress={onPress}
        android_ripple={{ color: '#e2e8f0' }}
        accessibilityRole="button"
        accessibilityLabel={`${product.title}, ${formattedPrice}. View product details`}
        accessibilityHint="Opens the product detail screen"
      >
        {content}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    borderRadius: 14,
    backgroundColor: '#ffffff',
    shadowColor: '#0f172a',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  container: {
    minHeight: 136,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  containerPressed: {
    opacity: 0.75,
  },
  imageContainer: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    padding: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  category: {
    marginBottom: 5,
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  title: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  price: {
    marginTop: 8,
    color: '#2563eb',
    fontSize: 18,
    fontWeight: '700',
  },
});
