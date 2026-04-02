import { getClosestGalleryContainer } from "./get-closest-gallery-container.js";

/**
 * Updates the current slide data attribute of the gallery thumbnails.
 * @param slides - The element containing the slides.
 * @param newSlideIndex - The new slide index.
 */
export const updateCurrentSlideData = (slides: Element, newSlideIndex: number): void => {
  const galleryThumbnailsSet = getClosestGalleryContainer(slides)?.querySelectorAll<HTMLElement>(".gallery-thumbnails");
  if (galleryThumbnailsSet)
    for (const galleryThumbnail of galleryThumbnailsSet) {
      galleryThumbnail.dataset.currentSlide = String(newSlideIndex);
    }
};
