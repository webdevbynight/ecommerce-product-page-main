import type { StorageData } from "../types.js";

import { getStorage } from "./get-storage.js";

import { EMPTY_STORAGE, STORAGE_ITEM_NAME } from "../constants.js";

/**
 * Removes a product from the storage by its ID.
 * @param id - The ID of the product to remove.
 */
export const removeProductById = (id: number): void => {
  const data: StorageData = JSON.parse(getStorage() ?? EMPTY_STORAGE);
  const { cart } = data;
  const updatedCart = cart.filter(product => product.id !== id);
  sessionStorage.setItem(STORAGE_ITEM_NAME, JSON.stringify({ ...data, cart: updatedCart }));
};
