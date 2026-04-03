import { getProducts } from "./get-products.js";

/**
 * Gets the total number of products in the cart, in terms of quantity.
 * @return The total number of products in the cart.
 */
export const getTotalProductsInCart = (): number => {
  const products = getProducts();
  return products.reduce((total, product) => total + product.quantity, 0);
};
