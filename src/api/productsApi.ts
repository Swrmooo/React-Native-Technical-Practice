import { isProduct, Product } from '../types/product';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load products (${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error('The product service returned invalid data.');
  }

  return data;
}
