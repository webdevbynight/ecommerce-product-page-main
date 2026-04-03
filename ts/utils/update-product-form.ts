import { getProductById } from "./get-product-by-id.js";

/**
 * Updates the product form, setting the correct initial quantity and enabling or disabling the inputs.
 * @param productForm - The product form element.
 */
export const updateProductForm = (productForm: HTMLFormElement): void => {
  const id = Number(productForm.querySelector<HTMLInputElement>(`input[name="id"]`)?.value);
  const inputs = productForm.querySelectorAll<HTMLButtonElement | HTMLInputElement>(`input:not([type="hidden"]), button`);
  const productData = getProductById(id);
  for (const input of inputs) {
    input.disabled = Boolean(productData);
    if (input.type === "number") input.value = String(productData?.quantity ?? 0);
  }
};
