
import imageService from "services/images";
import { isUrl } from "./isUrl";

export const createImageUrl = ({ src, collection = "", size = "raw" }, force = false) => {

  const BUCKET_NAME = imageService.getBucketName(collection);
  const IMAGE_BUCKET_URL = `https://${BUCKET_NAME}.s3.amazonaws.com`;

  if(force) return `${IMAGE_BUCKET_URL}/${size}/${src}`;
  return src.includes(";base64,") || isUrl(src) ? src : `${IMAGE_BUCKET_URL}/${size}/${src}`;
};