import { addProduct } from "../utils/add-product.js";
import { addQuantity } from "../utils/add-quantity.js";
import { convertToCents } from "../utils/convert-to-cents.js";
import { removeQuantity } from "../utils/remove-quantity.js";
import { updateCart } from "../utils/update-cart.js";
import { updateProductForm } from "../utils/update-product-form.js";
import { displayTotalProductsInCart } from "./display-total-products-in-cart.js";

/**
 * Handles the submission of the product form.
 * @param document - The document object.
 */
export const handleProductForm = (document: Document): void => {
  const productForms = document.querySelectorAll<HTMLFormElement>(".product form");
  for (const productForm of productForms) {
    updateProductForm(productForm);
    productForm.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(productForm);
      const id = Number(formData.get("id")) ?? 0;
      const name = String(formData.get("name")) ?? "";
      const productId = String(formData.get("productId")) ?? "";
      const currency = String(formData.get("currency")) ?? "";
      const currencySymbol = String(formData.get("currencySymbol")) ?? "";
      const unitPrice = convertToCents(Number(formData.get("unitPrice"))) ?? 0;
      const quantity = Number(formData.get("quantity")) ?? 0;
      if (quantity) {
        const product = {
          id,
          name,
          productId,
          currency,
          currencySymbol,
          unitPrice,
          quantity
        };
        const cart = document.getElementById("cart");
        addProduct(product);
        displayTotalProductsInCart(document);
        if (cart) updateCart(cart, product);
        const inputs = productForm.querySelectorAll<HTMLButtonElement | HTMLInputElement>(`input:not([type="hidden"]), button`);
        for (const input of inputs) {
          input.disabled = true;
        }
      }
    });
    const quantityInput = productForm.querySelector<HTMLInputElement>(`input[type="number"]#quantity`);
    const modifyQuantityButtons = productForm.querySelectorAll<HTMLButtonElement>(".modify-quantity");
    for (const modifyQuantityButton of modifyQuantityButtons) {
      if (quantityInput) {
        modifyQuantityButton.addEventListener("click", function () {
          if (this.classList.contains("add")) addQuantity(quantityInput);
          else removeQuantity(quantityInput);
        });
      }
    }
  }
};
