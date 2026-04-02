import { getBreakpoints } from "../utils/get-breakpoints.js";
import { removeWrappingButtons } from "../utils/remove-wrapping-buttons.js";
import { setDefaultActiveThumbnail } from "../utils/set-default-active-thumbnail.js";
import { generateGalleryThumbnails } from "./generate-gallery-thumbnails.js";
import { generateLightbox } from "./generate-lightbox.js";
import { generateSliderControls } from "./generate-slider-controls.js";

/**
 * Handles the gallery functionality, including adding slider controls and wrapping the gallery slides in a container.
 * @param document - The `Document` object to attach event listeners to.
 */
export const handleGallery = (document: Document): void => {
  const products = document.querySelectorAll(".product");
  for (const product of products) {
    const gallery = product.querySelector(".gallery");
    const gallerySlides = gallery?.querySelector(".gallery-slides");
    if (gallery && gallerySlides) {
      const gallerySlidesWrapper = document.createElement("div");
      gallerySlidesWrapper.className = "gallery-slides-wrapper";
      gallery.insertBefore(gallerySlidesWrapper, gallerySlides);
      gallerySlidesWrapper.appendChild(gallerySlides);
      const gallerySlidesItems = gallerySlides.querySelectorAll("li");
      for (const event of ["load", "resize"]) {
        window.addEventListener(event, () => {
          const breakpoints = getBreakpoints();
          const visibleMenu = breakpoints.get("visible-menu");
          const galleryThumbnails = gallery.querySelectorAll(".gallery-thumbnails");
          const galleryLightBox = gallery.querySelector(".gallery-lightbox");
          const sliderControls = gallery.querySelectorAll(".slider-controls");
          if (window.matchMedia(`(width < ${visibleMenu})`).matches) {
            galleryLightBox?.remove();
            removeWrappingButtons(gallerySlides.querySelectorAll("button"));
            for (const galleryThumbnail of galleryThumbnails) {
              galleryThumbnail.remove();
            }
            if (!sliderControls.length) {
              gallery.appendChild(generateSliderControls());
            }
          } else {
            for (const sliderControl of sliderControls) {
              sliderControl.remove();
            }
            const currentSlide = [...gallerySlides.classList.values()].find(className => className.startsWith("show-slide-"))?.replace("show-slide-", "") ?? "1";
            for (const gallerySlideItem of gallerySlidesItems) {
              const img = gallerySlideItem.querySelector("img");
              if (img) {
                const buttonText = `Enlarge ${img.alt}`;
                const button = document.createElement("button");
                button.type = "button";
                button.title = buttonText;
                button.innerHTML = `<span class="sr-only">${buttonText}</span>`;
                button.addEventListener("click", () => {
                  const dialog = generateLightbox(gallerySlides, currentSlide);
                  gallery.appendChild(dialog);
                  dialog.showModal();
                });
                button.appendChild(img);
                gallerySlideItem.appendChild(button);
              }
            }
            if (!galleryThumbnails.length) {
              gallery.appendChild(generateGalleryThumbnails(gallerySlidesItems, currentSlide));
            }
            setDefaultActiveThumbnail(gallery, currentSlide);
          }
        });
      }
    }
  }
};
