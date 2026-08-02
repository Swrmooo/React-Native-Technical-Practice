import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { isProduct, Product } from '../types/product';

const FAVORITES_STORAGE_KEY = '@product-favorites/favorites';

type FavoritesState = {
  favorites: Product[];
  isHydrated: boolean;
  canPersist: boolean;
};

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; product: Product }
  | { type: 'REMOVE_FAVORITE'; productId: number }
  | {
      type: 'HYDRATE_FAVORITES';
      favorites: Product[];
      canPersist: boolean;
    };

type FavoritesContextValue = {
  favorites: Product[];
  isHydrated: boolean;
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
};

type FavoritesProviderProps = {
  children: ReactNode;
};

const initialState: FavoritesState = {
  favorites: [],
  isHydrated: false,
  canPersist: false,
};

const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);

function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      const alreadyExists = state.favorites.some(
        (product) => product.id === action.product.id,
      );

      if (alreadyExists) {
        return state;
      }

      return {
        ...state,
        favorites: [...state.favorites, action.product],
      };
    }

    case 'REMOVE_FAVORITE': {
      const nextFavorites = state.favorites.filter(
        (product) => product.id !== action.productId,
      );

      if (nextFavorites.length === state.favorites.length) {
        return state;
      }

      return {
        ...state,
        favorites: nextFavorites,
      };
    }

    case 'HYDRATE_FAVORITES':
      return {
        favorites: action.favorites,
        isHydrated: true,
        canPersist: action.canPersist,
      };

    default:
      return state;
  }
}

export function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  useEffect(() => {
    let isActive = true;

    async function hydrateFavorites() {
      try {
        const storedFavorites = await AsyncStorage.getItem(
          FAVORITES_STORAGE_KEY,
        );
        let favorites: Product[] = [];

        if (storedFavorites) {
          const parsedFavorites: unknown = JSON.parse(storedFavorites);

          if (
            !Array.isArray(parsedFavorites) ||
            !parsedFavorites.every(isProduct)
          ) {
            throw new Error('Invalid saved favorites.');
          }

          favorites = parsedFavorites;
        }

        if (isActive) {
          dispatch({
            type: 'HYDRATE_FAVORITES',
            favorites,
            canPersist: true,
          });
        }
      } catch {
        if (isActive) {
          dispatch({
            type: 'HYDRATE_FAVORITES',
            favorites: [],
            canPersist: false,
          });
        }
      }
    }

    void hydrateFavorites();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!state.isHydrated || !state.canPersist) {
      return;
    }

    async function persistFavorites() {
      try {
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(state.favorites),
        );
      } catch {
        // Keep the in-memory state usable when storage is unavailable.
      }
    }

    void persistFavorites();
  }, [state.canPersist, state.favorites, state.isHydrated]);

  const addFavorite = useCallback((product: Product) => {
    if (!state.isHydrated) {
      return;
    }

    dispatch({ type: 'ADD_FAVORITE', product });
  }, [state.isHydrated]);

  const removeFavorite = useCallback((productId: number) => {
    if (!state.isHydrated) {
      return;
    }

    dispatch({ type: 'REMOVE_FAVORITE', productId });
  }, [state.isHydrated]);

  const isFavorite = useCallback(
    (productId: number) =>
      state.favorites.some((product) => product.id === productId),
    [state.favorites],
  );

  const value = useMemo(
    () => ({
      favorites: state.favorites,
      isHydrated: state.isHydrated,
      addFavorite,
      removeFavorite,
      isFavorite,
    }),
    [
      addFavorite,
      isFavorite,
      removeFavorite,
      state.favorites,
      state.isHydrated,
    ],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites must be used within a FavoritesProvider.',
    );
  }

  return context;
}
