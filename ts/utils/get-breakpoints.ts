import type { Breakpoints } from "../types.js";

import { convertPxToEm } from "./convert-px-to-em.js";

/**
 * Gets the breakpoints declared as CSS custom properties at the root element.
 *
 * Cross-origin stylesheets are ignored.
 * @return A map containing key/value pairs (the breakpoint name as the key and its value converted to em).
 */
export const getBreakpoints = (): Breakpoints => {
  const breakpoints: Breakpoints = new Map();
  const prefix = "--breakpoint-";
  const isSameOrigin = (href: string | null) => {
    if (!href) return true;
    try {
      const url = new URL(href, location.href);
      return url.origin === location.origin;
    } catch {
      return false;
    }
  };
  for (const sheet of document.styleSheets) {
    if (!isSameOrigin(sheet.href)) continue;
    for (const rule of sheet.cssRules) {
      if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
        for (const property of rule.style) {
          if (property.startsWith(prefix)) breakpoints.set(property.replace(prefix, ""), convertPxToEm(Number.parseFloat(rule.style.getPropertyValue(property))));
        }
      }
    }
  }
  return breakpoints;
};
