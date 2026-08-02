import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fetchProducts } from '../api/productsApi';
import { ProductCard } from '../components/ProductCard';
import { ScreenState } from '../components/ScreenState';
import { ProductsStackParamList } from '../navigation/types';
import { Product } from '../types/product';

const LOAD_ERROR_MESSAGE =
  'Check your internet connection and try again.';

type Props = NativeStackScreenProps<
  ProductsStackParamList,
  'ProductList'
>;

export function ProductListScreen({ navigation }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(
    async (showRefreshIndicator: boolean, signal?: AbortSignal) => {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setError(null);

      try {
        const nextProducts = await fetchProducts(signal);
        setProducts(nextProducts);
      } catch (requestError) {
        if (signal?.aborted) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : LOAD_ERROR_MESSAGE,
        );
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    void loadProducts(false, controller.signal);

    return () => controller.abort();
  }, [loadProducts]);

  const handleRefresh = useCallback(() => {
    void loadProducts(true);
  }, [loadProducts]);

  const handleRetry = useCallback(() => {
    void loadProducts(false);
  }, [loadProducts]);

  if (isLoading) {
    return (
      <ScreenState
        title="Loading products"
        message="Please wait a moment."
        isLoading
      />
    );
  }

  if (error && products.length === 0) {
    return (
      <ScreenState
        title="Unable to load products"
        message={`${error} ${LOAD_ERROR_MESSAGE}`}
        iconName="cloud-offline-outline"
        actionLabel="Try again"
        onAction={handleRetry}
      />
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() =>
            navigation.navigate('ProductDetail', { product: item })
          }
        />
      )}
      contentContainerStyle={[
        styles.listContent,
        products.length === 0 && styles.emptyListContent,
      ]}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        error ? (
          <View style={styles.refreshError}>
            <Ionicons
              name="alert-circle-outline"
              size={22}
              color="#991b1b"
              accessible={false}
            />
            <View style={styles.refreshErrorContent}>
              <Text style={styles.refreshErrorText}>
                Refresh failed. {LOAD_ERROR_MESSAGE}
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.refreshRetryButton,
                  pressed && styles.refreshRetryButtonPressed,
                ]}
                onPress={handleRefresh}
                accessibilityRole="button"
                accessibilityLabel="Try refreshing products again"
              >
                <Text style={styles.refreshRetryText}>Try again</Text>
              </Pressable>
            </View>
          </View>
        ) : null
      }
      ListEmptyComponent={
        <ScreenState
          title="No products found"
          message="Pull down to check again."
          iconName="cube-outline"
        />
      }
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      accessibilityLabel="Product list"
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
  separator: {
    height: 12,
  },
  refreshError: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fecaca',
    borderRadius: 10,
    backgroundColor: '#fee2e2',
    padding: 12,
  },
  refreshErrorContent: {
    flex: 1,
    marginLeft: 10,
  },
  refreshErrorText: {
    color: '#991b1b',
    lineHeight: 20,
  },
  refreshRetryButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingVertical: 4,
  },
  refreshRetryButtonPressed: {
    opacity: 0.6,
  },
  refreshRetryText: {
    color: '#9f1239',
    fontWeight: '700',
  },
});
