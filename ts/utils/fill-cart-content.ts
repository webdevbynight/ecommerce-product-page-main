import { convertToPrice } from "./convert-to-price.js";
import { getProducts } from "./get-products.js";

import { SVG_NAMESPACE_URI, THUMBNAIL_SIZE } from "../constants.js";

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
      const { productId, name, currencySymbol, unitPrice, quantity } = product;
      const li = document.createElement("li");
      const imageFolder = "./media/";
      const imageFileBaseName = `${productId}-1-thumbnail`;
      const imageFileName = `${imageFolder}${imageFileBaseName}.webp`;
      const hdImageFileNames = [];
      for (let i = 4; i > 1; i--) {
        hdImageFileNames.push(`${imageFolder}${imageFileBaseName}@${i}x.webp ${i}x`);
      }
      const img = document.createElement("img");
      img.src = imageFileName;
      img.srcset = hdImageFileNames.join(", ");
      img.alt = "";
      img.width = THUMBNAIL_SIZE;
      img.height = THUMBNAIL_SIZE;
      img.loading = "lazy";
      const productInfo = document.createElement("span");
      const productName = document.createElement("span");
      productName.className = "product-name";
      productName.textContent = name;
      const amount = document.createElement("span");
      amount.className = "amount";
      amount.innerHTML = `${currencySymbol}${convertToPrice(unitPrice)} × ${quantity} <span class="total">${currencySymbol}${convertToPrice(unitPrice * quantity)}</span>`;
      productInfo.appendChild(productName);
      productInfo.appendChild(amount);
      const removeText = "Remove from cart";
      const button = document.createElement("button");
      button.type = "button";
      button.title = removeText;
      const svgWidth = 14;
      const svgHeight = 16;
      const svg = document.createElementNS(SVG_NAMESPACE_URI, "svg");
      svg.setAttribute("xmlns", SVG_NAMESPACE_URI);
      svg.setAttribute("width", String(svgWidth));
      svg.setAttribute("height", String(svgHeight));
      svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", removeText);
      const path = document.createElementNS(SVG_NAMESPACE_URI, "path");
      path.setAttribute(
        "d",
        "M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
      );
      svg.appendChild(path);
      button.appendChild(svg);
      li.appendChild(img);
      li.appendChild(productInfo);
      li.appendChild(button);
      ul.appendChild(li);
    }
    nodes.push(ul);
    const p = document.createElement("p");
    const link = document.createElement("a");
    link.href = "./";
    link.textContent = "Checkout";
    p.appendChild(link);
    nodes.push(p);
  } else {
    const p = document.createElement("p");
    p.textContent = "Your cart is empty";
    nodes.push(p);
  }
  return nodes;
};
