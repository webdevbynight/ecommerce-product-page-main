/**
 * Removes wrapping buttons from the gallery slides, leaving only the image.
 * @param buttons - The buttons to remove.
 */
export const removeWrappingButtons = (buttons: NodeListOf<Element>): void => {
  for (const button of buttons) {
    const img = button.querySelector("img");
    if (img) {
      button.parentNode?.appendChild(img);
      button.remove();
    }
  }
};
