import { getClosestGalleryContainer } from "../utils/get-closest-gallery-container.js";
import { setThumbnailResource } from "../utils/set-thumbnail-resource.js";

import { THUMBNAIL_SIZE } from "../constants.js";

/**
 * Generates the gallery thumbnails.
 * @param slides - The list of elements containing the slides.
 * @param currentSlide - The current slide index.
 * @return A `ul` element containing the gallery thumbnails.
 */
export const generateGalleryThumbnails = (slides: NodeListOf<HTMLLIElement>, currentSlide: string): HTMLUListElement => {
  const ul = document.createElement("ul");
  ul.className = "gallery-thumbnails";
  ul.dataset.currentSlide = currentSlide;
  slides.forEach((gallerySlideItem, index) => {
    const originalImage = gallerySlideItem.querySelector("img");
    const li = document.createElement("li");
    const buttonText = "Show preview";
    const button = document.createElement("button");
    button.type = "button";
    button.title = buttonText;
    button.dataset.showSlide = String(index + 1);
    button.addEventListener("click", function () {
      const gallery = getClosestGalleryContainer(this);
      if (gallery) {
        const galleryThumbnailsSet = gallery.querySelectorAll<HTMLElement>(".gallery-thumbnails");
        for (const galleryThumbnails of galleryThumbnailsSet) {
          const currentSlide = Number(galleryThumbnails.dataset.currentSlide) ?? 1;
          const gallerySlidesSet = gallery.querySelectorAll(".gallery-slides");
          const newSlidePosition = this.dataset.showSlide;
          for (const gallerySlides of gallerySlidesSet) {
            gallerySlides?.classList.remove(`show-slide-${currentSlide}`);
            gallerySlides?.classList.add(`show-slide-${newSlidePosition}`);
          }
          const galleryThumbnailButtons = galleryThumbnails.querySelectorAll("button");
          for (const galleryThumbnailButton of galleryThumbnailButtons) {
            galleryThumbnailButton.removeAttribute("aria-current");
            if (galleryThumbnailButton.dataset.showSlide === newSlidePosition) galleryThumbnailButton.ariaCurrent = "true";
          }
          galleryThumbnails.dataset.currentSlide = newSlidePosition;
        }
      }
    });
    const img = document.createElement("img");
    img.src = setThumbnailResource(originalImage?.src);
    img.srcset = setThumbnailResource(originalImage?.srcset);
    img.alt = buttonText;
    img.width = THUMBNAIL_SIZE;
    img.height = THUMBNAIL_SIZE;
    img.loading = "lazy";
    button.appendChild(img);
    li.appendChild(button);
    ul.appendChild(li);
  });
  return ul;
};
