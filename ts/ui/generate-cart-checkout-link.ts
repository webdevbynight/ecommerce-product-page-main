/**
 * Generates the checkout link for the cart.
 * @return A `p` element containing the checkout link.
 */
export const generateCartCheckoutLink = (): HTMLParagraphElement => {
  const p = document.createElement("p");
  const link = document.createElement("a");
  link.href = "./";
  link.textContent = "Checkout";
  p.appendChild(link);
  return p;
};
