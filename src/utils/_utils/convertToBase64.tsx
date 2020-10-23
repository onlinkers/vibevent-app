
/**
 * converts a file into base64 encoded format
 * @param file - the file to convert
 */
export const convertToBase64 = (file):Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};