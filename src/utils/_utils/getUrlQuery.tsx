import popup from "popup";
/**
 * Gets query from a url string
 * @param source - the original url string
 * @param query - query to get
 */
export const getUrlQuery = (source: string, query: string) => {
  try {
    const result = new URLSearchParams(source).get(query);
    return result;

  } catch (err) {
    popup.error(`Cannot parse the given url: ${err.message}`);
  }
};
