/**
 * Converts a price to a human-readable format with two decimal places.
 * @param price - The price to convert.
 * @return The converted price.
 */
export const convertToPrice = (price: number): string => (price / 100).toFixed(2);
