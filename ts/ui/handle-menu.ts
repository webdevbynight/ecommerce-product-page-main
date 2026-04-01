import { getBreakpoints } from "../utils/get-breakpoints.js";
import { disableMenu } from "./disable-menu.js";
import { handleSkipLinkMenu } from "./handle-skip-link-menu.js";

import { SVG_NAMESPACE_URI } from "../constants.js";

/**
 * Handles menu functionality, including opening and closing the menu and setting inert attribute.
 * @param document - The Document object to attach event listeners to.
 */
export const handleMenu = (document: Document): void => {
  for (const event of ["load", "resize"]) {
    window.addEventListener(event, () => {
      const breakpoints = getBreakpoints();
      const visibleMenu = breakpoints.get("visible-menu");
      const header = document.getElementById("header");
      const menu = document.getElementById("menu");
      if (header && menu) {
        const skipLinkMenu = header.querySelector('.skip-links a[href="#menu"]');
        const closeMenuElements = header.querySelectorAll(".close-menu");
        if (window.matchMedia(`(width < ${visibleMenu})`).matches) {
          if (closeMenuElements.length) return;
          disableMenu(menu);
          const closeMenuText = "Close menu";
          const closeMenu = document.createElement("p");
          closeMenu.className = "close-menu";
          const button = document.createElement("button");
          button.type = "button";
          button.addEventListener("click", function () {
            this.parentElement?.classList.toggle("active");
            disableMenu(menu);
          });
          const svgWidth = 14;
          const svgHeight = 15;
          const svg = document.createElementNS(SVG_NAMESPACE_URI, "svg");
          svg.setAttribute("xmlns", SVG_NAMESPACE_URI);
          svg.setAttribute("width", String(svgWidth));
          svg.setAttribute("height", String(svgHeight));
          svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
          svg.setAttribute("role", "img");
          svg.setAttribute("aria-label", closeMenuText);
          const desc = document.createElementNS(SVG_NAMESPACE_URI, "desc");
          desc.textContent = closeMenuText;
          const path = document.createElementNS(SVG_NAMESPACE_URI, "path");
          path.setAttribute("d", "m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z");
          svg.appendChild(path);
          button.appendChild(svg);
          closeMenu.appendChild(button);
          menu.insertAdjacentElement("afterend", closeMenu);
          if (skipLinkMenu) {
            skipLinkMenu.addEventListener("click", handleSkipLinkMenu);
          }
        } else {
          menu.removeAttribute("inert");
          if (skipLinkMenu) skipLinkMenu.removeEventListener("click", handleSkipLinkMenu);
          for (const closeMenuElement of closeMenuElements) {
            closeMenuElement.remove();
          }
        }
      }
    });
  }
};
