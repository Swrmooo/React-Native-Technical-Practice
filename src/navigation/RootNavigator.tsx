import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FavoritesScreen } from '../screens/FavoritesScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { ProductListScreen } from '../screens/ProductListScreen';
import {
  ProductsStackParamList,
  RootTabParamList,
} from './types';

const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();
const RootTab = createBottomTabNavigator<RootTabParamList>();

function ProductsNavigator() {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: '#f8fafc' },
        headerTintColor: '#0f172a',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <ProductsStack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Products' }}
      />
      <ProductsStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Product Detail' }}
      />
    </ProductsStack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <RootTab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: '#64748b',
          headerTintColor: '#0f172a',
          headerTitleStyle: { fontWeight: '700' },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarStyle: {
            borderTopColor: '#e2e8f0',
          },
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={
                route.name === 'Products'
                  ? focused
                    ? 'storefront'
                    : 'storefront-outline'
                  : focused
                    ? 'heart'
                    : 'heart-outline'
              }
              color={color}
              size={size}
            />
          ),
        })}
      >
        <RootTab.Screen
          name="Products"
          component={ProductsNavigator}
          options={{
            headerShown: false,
            tabBarAccessibilityLabel: 'Browse products',
          }}
        />
        <RootTab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarAccessibilityLabel: 'View favorite products',
          }}
        />
      </RootTab.Navigator>
    </NavigationContainer>
  );
}
