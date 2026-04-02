/**
 * Get the closest element containing a gallery.
 * @param element - The starting element.
 * @returns The closest root gallery element if available, `null` otherwise.
 */
export const getClosestGalleryContainer = (element: Element): Element | null => {
  const closestLightbox = element.closest("#lightbox");
  if (closestLightbox) return closestLightbox;
  return element.closest(".gallery");
};
