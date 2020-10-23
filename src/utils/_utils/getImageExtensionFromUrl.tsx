const ACCEPTABLE_EXTENSIONS = ["png", "jpg", "jpeg"];

/**
 * gets the image extension from a url string
 * @param url - the url to decode
 */
export const getImageExtensionFromUrl = (url: string): string => {

  // do some whacky splitting
  const cleanUrl = url.split(/[#?]/)[0] || "";
  let extension = cleanUrl.split(".").pop() || "";
  extension = extension.trim();

  // check if extension is acceptable
  if(!ACCEPTABLE_EXTENSIONS.includes(extension.toLowerCase())) return ACCEPTABLE_EXTENSIONS[0];
  else return extension;
  
};