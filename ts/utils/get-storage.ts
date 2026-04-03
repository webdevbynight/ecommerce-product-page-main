import { STORAGE_ITEM_NAME } from "../constants.js";

/**
 * Gets the storage from `sessionStorage`.
 * @return The stringified storage data if they exist, `null` otherwise.
 */
export const getStorage = (): string | null => sessionStorage.getItem(STORAGE_ITEM_NAME);
