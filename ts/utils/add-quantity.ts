/**
 * Adds 1 to the quantity of the product.
 * @param input - The `input` element containing the quantity.
 */
export const addQuantity = (input: HTMLInputElement): void => {
  const { value } = input;
  const quantity = Number.parseInt(value, 10) || 0;
  input.value = String(quantity + 1);
};
