import { getClosestGalleryContainer } from "./get-closest-gallery-container.js";

/**
 * Updates the active thumbnail in the gallery.
 * @param slides - The element containing the slides.
 * @param newSlideIndex - The new slide index.
 */
export const updateActiveThumbnail = (slides: Element, newSlideIndex: number): void => {
  const gallery = getClosestGalleryContainer(slides);
  if (gallery) {
    gallery.querySelector(`.gallery-thumbnails li:nth-child(${newSlideIndex}) button`)?.dispatchEvent(new Event("click"));
  }
};
