const ACCEPTABLE_EXTENSIONS = ["png", "jpg"];

/**
 * gets the image extension from a url string
 * @param url - the url to decode
 */
export const getImageExtensionFromUrl = (url: string): string => {

  // do some whacky splitting
  let extension = url.split(/[#?]/)[0] || "";
  extension = extension.split(".").pop() || "";
  extension = extension.trim();

  // check if extension is acceptable
  if(!ACCEPTABLE_EXTENSIONS.includes(extension.toLowerCase())) return ACCEPTABLE_EXTENSIONS[0];
  else return extension;
  
};