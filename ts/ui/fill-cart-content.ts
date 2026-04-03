import { getProducts } from "../utils/get-products.js";
import { generateCartCheckoutLink } from "./generate-cart-checkout-link.js";
import { generateCartLi } from "./generate-cart-li.js";
import { generateEmptyCartMention } from "./generate-empty-cart-mention.js";

/**
 * Fills the cart content with product information.
 * @return The cart content as HTML.
 */
export const fillCartContent = (): (HTMLUListElement | HTMLParagraphElement)[] => {
  const nodes: (HTMLUListElement | HTMLParagraphElement)[] = [];
  const products = getProducts();
  if (products.length) {
    const ul = document.createElement("ul");
    for (const product of products) {
      ul.appendChild(generateCartLi(product));
    }
    nodes.push(ul);
    nodes.push(generateCartCheckoutLink());
  } else nodes.push(generateEmptyCartMention());
  return nodes;
};
