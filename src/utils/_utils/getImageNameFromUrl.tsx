/**
 * gets the image name from a url string
 * @param url - the url to decode
 */
export const getImageNameFromUrl = (url: string): string => {

  const cleanUrl = url.split(/[#?]/)[0] || "";
  return cleanUrl.substring(cleanUrl.lastIndexOf("/") + 1);
  
};