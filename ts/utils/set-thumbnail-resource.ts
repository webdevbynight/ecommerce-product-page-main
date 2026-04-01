/**
 * Sets the thumbnail resource based on the original resource.
 * @param originalResource - The original resource.
 * @return The thumbnail resource if the original resource is defined, an empty string otherwise.
 */
export const setThumbnailResource = (originalResource: string | undefined): string => {
  return originalResource?.replace(/(\d+)((@\dx)?\.[a-z]+)/i, "$1-thumbnail$2") ?? "";
};
