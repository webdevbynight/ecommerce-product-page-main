/**
 * Sets the default active thumbnail.
 * @param element - The starting element for the selector request.
 * @param currentSlide - The current slide index.
 */
export const setDefaultActiveThumbnail = (element: Element, currentSlide: string): void => {
  const activeButton = element.querySelector(`.gallery-thumbnails li:nth-child(${currentSlide}) button`);
  if (activeButton) activeButton.dispatchEvent(new MouseEvent("click"));
};
