/**
 * Generates the mention that the cart is empty.
 * @return A `p` element containing the mention.
 */
export const generateEmptyCartMention = (): HTMLParagraphElement => {
  const p = document.createElement("p");
  p.textContent = "Your cart is empty.";
  return p;
};
