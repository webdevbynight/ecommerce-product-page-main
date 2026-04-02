import type { SliderSteps } from "../types.js";

import { moveToSlide } from "../utils/move-to-slide.js";

import { SVG_NAMESPACE_URI } from "../constants.js";

/**
 * Generates a slider button element.
 * @param step - The step to move to ("next" or "previous").
 * @param isLightBox - Whether the slider is in lightbox mode or not.
 */
export const generateSliderButton = (step: SliderSteps, isLightBox = false): HTMLButtonElement => {
  const buttonText = step === "next" ? "Next" : "Previous";
  const button = document.createElement("button");
  button.type = "button";
  button.className = step;
  button.addEventListener("click", function () {
    moveToSlide(this, step);
  });
  const svgWidth = isLightBox ? 12 : 9;
  const svgHeight = isLightBox ? 19 : 14;
  const svg = document.createElementNS(SVG_NAMESPACE_URI, "svg");
  svg.setAttribute("xmlns", SVG_NAMESPACE_URI);
  svg.setAttribute("width", String(svgWidth));
  svg.setAttribute("height", String(svgHeight));
  svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", buttonText);
  const path = document.createElementNS(SVG_NAMESPACE_URI, "path");
  const dValue = isLightBox ? (step === "next" ? "M1.06067 1.06067L9.06067 9.06067L1.06067 17.0607" : "M10.1213 1.06067L2.12134 9.06067L10.1213 17.0607") : step === "next" ? "M1.06067 1.06067L6.77495 6.77495L1.06067 12.4892" : "M7.83557 1.06067L2.12129 6.77495L7.83557 12.4892";
  path.setAttribute("d", dValue);
  svg.appendChild(path);
  button.appendChild(svg);
  return button;
};
