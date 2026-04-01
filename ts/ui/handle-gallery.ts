import { getBreakpoints } from "../utils/get-breakpoints.js";
import { setThumbnailResource } from "../utils/set-thumbnail-resource.js";
import { createSliderButton } from "./create-slider-button.js";

import { THUMBNAIL_SIZE } from "../constants.js";

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
      for (const gallerySlideItem of gallerySlidesItems) {
        const buttonText = "Enlarge";
        const button = document.createElement("button");
        button.type = "button";
        button.title = buttonText;
        button.innerHTML = `<span class="sr-only">${buttonText}</span>`;
        gallerySlideItem.appendChild(button);
      }
      for (const event of ["load", "resize"]) {
        window.addEventListener(event, () => {
          const breakpoints = getBreakpoints();
          const visibleMenu = breakpoints.get("visible-menu");
          const galleryThumbnails = gallery.querySelectorAll(".gallery-thumbnails");
          const sliderControls = gallery.querySelectorAll(".slider-controls");
          if (window.matchMedia(`(width < ${visibleMenu})`).matches) {
            for (const galleryThumbnail of galleryThumbnails) {
              galleryThumbnail.remove();
            }
            if (!sliderControls.length) {
              const p = document.createElement("p");
              p.className = "slider-controls";
              p.appendChild(createSliderButton("previous"));
              p.appendChild(createSliderButton("next"));
              gallery.appendChild(p);
            }
          } else {
            for (const sliderControl of sliderControls) {
              sliderControl.remove();
            }
            const currentSlide = [...gallerySlides.classList.values()].find(className => className.startsWith("show-slide-"))?.replace("show-slide-", "") ?? "1";
            if (!galleryThumbnails.length) {
              const ul = document.createElement("ul");
              ul.className = "gallery-thumbnails";
              ul.dataset.currentSlide = currentSlide;
              gallerySlidesItems.forEach((gallerySlideItem, index) => {
                const originalImage = gallerySlideItem.querySelector("img");
                const li = document.createElement("li");
                const buttonText = "Show preview";
                const button = document.createElement("button");
                button.type = "button";
                button.title = buttonText;
                button.dataset.showSlide = String(index + 1);
                button.addEventListener("click", function () {
                  const galleryThumbnails = this.closest<HTMLElement>(".gallery-thumbnails");
                  const gallery = this.closest(".gallery");
                  if (galleryThumbnails && gallery) {
                    const currentSlide = Number(galleryThumbnails.dataset.currentSlide) ?? 1;
                    const gallerySlides = gallery.querySelector(".gallery-slides");
                    gallerySlides?.classList.remove(`show-slide-${currentSlide}`);
                    gallerySlides?.classList.add(`show-slide-${this.dataset.showSlide}`);
                    for (const galleryThumbnailButton of galleryThumbnails.querySelectorAll("button")) {
                      galleryThumbnailButton.removeAttribute("aria-current");
                    }
                    this.ariaCurrent = "true";
                    galleryThumbnails.dataset.currentSlide = this.dataset.showSlide;
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
              gallery.appendChild(ul);
            }
            gallery.querySelector(`.gallery-thumbnails li:nth-child(${currentSlide}) button`)?.dispatchEvent(new Event("click"));
          }
        });
      }
    }
  }
};
