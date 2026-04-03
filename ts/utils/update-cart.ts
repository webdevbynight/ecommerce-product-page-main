import type { ProductData } from "../types.js";

import { generateCartCheckoutLink } from "../ui/generate-cart-checkout-link.js";
import { generateCartLi } from "../ui/generate-cart-li.js";
import { generateEmptyCartMention } from "../ui/generate-empty-cart-mention.js";

/**
 * Updates the cart with a new product or, if not provided, with an empty cart replacing a list made empty.
 * @param cart - The cart element.
 * @param [product] - The product to add to the cart.
 */
export const updateCart = (cart: Element, product?: ProductData): void => {
  const ul = cart.querySelector("ul");
  const p = cart.querySelector("p");
  if (product) {
    if (ul) {
      ul.appendChild(generateCartLi(product));
    } else {
      if (p) {
        const ul = document.createElement("ul");
        ul.appendChild(generateCartLi(product));
        p.replaceWith(ul, generateCartCheckoutLink());
      }
    }
  } else if (ul && p && !ul.hasChildNodes()) {
    ul.remove();
    p.replaceWith(generateEmptyCartMention());
  }
};
