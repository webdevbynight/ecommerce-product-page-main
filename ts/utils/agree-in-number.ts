/**
 * Returns the singular or plural form of a word based on the number.
 * @param number - The number to check.
 * @param word - A tuple containing the singular and plural forms of the word.
 * @return The singular or plural form of the word.
 */
export const agreeInNumber = (number: number, word: [string, string]) => {
  const [singular, plural] = word;
  return number === 1 ? singular : plural;
};
