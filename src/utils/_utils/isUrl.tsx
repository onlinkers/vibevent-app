
/**
 * Checks if a string is of URL form
 * @param src - string to check
 */
export const isUrl = (src: string = ""): boolean => {
  const urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
  const regex = new RegExp(urlExpression);
  return !!src.match(regex);
};