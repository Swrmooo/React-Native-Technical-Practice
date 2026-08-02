export type ProductRating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: ProductRating;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) {
    return false;
  }

  const hasValidRating =
    value.rating === undefined ||
    (isRecord(value.rating) &&
      typeof value.rating.rate === 'number' &&
      typeof value.rating.count === 'number');

  return (
    typeof value.id === 'number' &&
    typeof value.title === 'string' &&
    typeof value.price === 'number' &&
    typeof value.description === 'string' &&
    typeof value.category === 'string' &&
    typeof value.image === 'string' &&
    hasValidRating
  );
}
