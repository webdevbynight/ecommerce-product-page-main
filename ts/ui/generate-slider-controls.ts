import { generateSliderButton } from "./generate-slider-button.js";

/**
 * Generates the slider controls.
 * @param isLightbox - Whether the slider controls are used in a lightbox or not.
 * @return A `p` element containing the slider controls.
 */
export const generateSliderControls = (isLightbox = false): HTMLParagraphElement => {
  const p = document.createElement("p");
  p.className = "slider-controls";
  p.appendChild(generateSliderButton("previous", isLightbox));
  p.appendChild(generateSliderButton("next", isLightbox));
  return p;
};
