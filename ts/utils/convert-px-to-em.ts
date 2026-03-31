import type { SizeInEm } from "../types.js";

import { DEFAULT_ROOT_FONT_SIZE_IN_PX } from "../constants.js";

/**
 * Converts a value in pixel to em.
 * @param value - The value, assumed in pixels, to convert.
 * @return The value in em.
 */
export const convertPxToEm = (value: number): SizeInEm => `${value / DEFAULT_ROOT_FONT_SIZE_IN_PX}em`;
