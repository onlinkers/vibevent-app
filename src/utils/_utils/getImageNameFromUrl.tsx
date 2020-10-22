/**
 * gets the image name from a url string
 * @param url - the url to decode
 */
export const getImageNameFromUrl = (url: string): string => {

  return url.substring(url.lastIndexOf("/") + 1);
  
};