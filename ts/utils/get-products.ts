import type { ProductData, StorageData } from "../types.js";

import { getStorage } from "./get-storage.js";

/**
 * Retrieves the products from the storage.
 * @return An array of products.
 */
export const getProducts = (): ProductData[] => {
  const storage = getStorage();
  if (storage) {
    const data: StorageData = JSON.parse(storage);
    const { cart } = data;
    if (cart.length) return cart;
  }
  return [];
};
