/**
 * Enables the menu on smaller screens.
 * @param menu - The menu element to enable.
 */
export const enableMenu = (menu: HTMLElement): void => {
  menu.classList.add("active");
  menu.removeAttribute("inert");
};
