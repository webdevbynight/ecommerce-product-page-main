/**
 * Converts an amount to cents to avoid floating point errors.
 * @param amount - The amount to convert.
 * @return The converted amount in cents.
 */
export const convertToCents = (amount: number) => amount * 100;
