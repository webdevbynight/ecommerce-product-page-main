import type { ProductData } from "../types.js";

import { getProducts } from "./get-products.js";

/**
 * Gets a product by its ID.
 * @param id - The ID of the product.
 * @return The product with the specified ID if found, `undefined` otherwise.
 */
export const getProductById = (id: number): ProductData | undefined => {
  const products = getProducts();
  return products.find(product => product.id === id);
};
