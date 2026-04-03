import type { ProductData, StorageData } from "../types.js";

import { getStorage } from "./get-storage.js";

import { EMPTY_STORAGE, STORAGE_ITEM_NAME } from "../constants.js";

/**
 * Adds a product to the storage.
 * @param product - The product to add.
 */
export const addProduct = (product: ProductData): void => {
  const data: StorageData = JSON.parse(getStorage() ?? EMPTY_STORAGE);
  const { cart } = data;
  cart.push(product);
  sessionStorage.setItem(STORAGE_ITEM_NAME, JSON.stringify({ ...data, cart }));
};
