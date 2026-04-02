/**
 * Closes and removes the `dialog` element from the DOM.
 * @param dialogElement - The `dialog` element.
 */
export const closeAndRemoveDialog = (dialogElement: HTMLDialogElement): void => {
  dialogElement.close();
  dialogElement.remove();
};
