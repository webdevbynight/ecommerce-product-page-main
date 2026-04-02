import { closeAndRemoveDialog } from "../utils/close-and-remove-dialog.js";
import { removeWrappingButtons } from "../utils/remove-wrapping-buttons.js";
import { setDefaultActiveThumbnail } from "../utils/set-default-active-thumbnail.js";
import { generateGalleryThumbnails } from "./generate-gallery-thumbnails.js";
import { generateSliderControls } from "./generate-slider-controls.js";

import { SVG_NAMESPACE_URI } from "../constants.js";

/**
 * Generates the lightbox for the gallery.
 * @param gallerySlides - The element containing the gallery slides.
 * @param currentSlide - The current slide number.
 * @return A `dialog` element containing the lightbox.
 */
export const generateLightbox = (gallerySlides: Element, currentSlide: string): HTMLDialogElement => {
  const gallerySlidesItems = gallerySlides.querySelectorAll("li");
  const dialog = document.createElement("dialog");
  dialog.id = "lightbox";
  dialog.className = "gallery-lightbox";
  dialog.setAttribute("aria-live", "polite");
  dialog.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAndRemoveDialog(dialog);
  });
  const closeButtonContainer = document.createElement("p");
  const closeButtonText = "Close";
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "close";
  closeButton.title = closeButtonText;
  closeButton.innerHTML = `<span class="sr-only">${closeButtonText}</span>`;
  closeButton.addEventListener("click", () => {
    closeAndRemoveDialog(dialog);
  });
  const svgWidth = 20;
  const svgHeight = 20;
  const svg = document.createElementNS(SVG_NAMESPACE_URI, "svg");
  svg.setAttribute("xmlns", SVG_NAMESPACE_URI);
  svg.setAttribute("width", String(svgWidth));
  svg.setAttribute("height", String(svgHeight));
  svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", closeButtonText);
  const path = document.createElementNS(SVG_NAMESPACE_URI, "path");
  path.setAttribute("d", "M20 2.85714L17.1429 0L10 7.14286L2.85714 0L0 2.85714L7.14286 10L0 17.1429L2.85714 20L10 12.8571L17.1429 20L20 17.1429L12.8571 10L20 2.85714Z");
  svg.appendChild(path);
  closeButton.appendChild(svg);
  closeButtonContainer.appendChild(closeButton);
  const gallerySlidesWrapper = document.createElement("div");
  gallerySlidesWrapper.className = "gallery-slides-wrapper";
  const lightboxGallerySlides = gallerySlides.cloneNode(true);
  gallerySlidesWrapper.appendChild(lightboxGallerySlides);
  dialog.appendChild(gallerySlidesWrapper);
  dialog.appendChild(generateSliderControls(true));
  dialog.appendChild(generateGalleryThumbnails(gallerySlidesItems, currentSlide));
  dialog.appendChild(closeButtonContainer);
  removeWrappingButtons(dialog.querySelectorAll(".gallery-slides button"));
  setDefaultActiveThumbnail(dialog, currentSlide);
  return dialog;
};
