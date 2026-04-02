import type { SliderSteps } from "../types.js";

import { getClosestGalleryContainer } from "./get-closest-gallery-container.js";
import { updateActiveThumbnail } from "./update-active-thumbnail.js";
import { updateCurrentSlideData } from "./update-current-slide-data.js";

/**
 * Moves the slider to the next or previous slide.
 * @param button - The button element which triggered the slide movement.
 * @param step - The step to move to ("next" or "previous").
 */
export const moveToSlide = (button: HTMLButtonElement, step: SliderSteps): void => {
  const gallerySlidesSet = getClosestGalleryContainer(button)?.querySelectorAll(".gallery-slides");
  if (gallerySlidesSet) {
    for (const gallerySlides of gallerySlidesSet) {
      const totalSlides = gallerySlides?.querySelectorAll("li")?.length;
      if (gallerySlides && totalSlides) {
        const showSlideClass = /^show-slide-\d+$/;
        const slidesClassList = [...gallerySlides.classList.values()];
        const currentPosition = Number((slidesClassList.find(className => showSlideClass.test(className)) ?? "show-slide-1").replace(/\D+/g, ""));
        const newPosition = step === "next" ? (currentPosition === totalSlides ? 1 : currentPosition + 1) : currentPosition === 1 ? totalSlides : currentPosition - 1;
        gallerySlides.classList.remove(`show-slide-${currentPosition}`);
        gallerySlides.classList.add(`show-slide-${newPosition}`);
        updateCurrentSlideData(gallerySlides, newPosition);
        updateActiveThumbnail(gallerySlides, newPosition);
      }
    }
  }
};
