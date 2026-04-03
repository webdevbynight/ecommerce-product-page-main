/**
 * Removes 1 to the quantity of the product, considering that the quantity cannot be less than 0.
 * @param input - The `input` element containing the quantity.
 */
export const removeQuantity = (input: HTMLInputElement): void => {
  const { value } = input;
  const quantity = Number.parseInt(value, 10) || 0;
  input.value = String(quantity ? quantity - 1 : 0);
};
