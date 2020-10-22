import React from "react";
import imageService from "services/images";

interface Props {
    src: string
    collection?: string
    size?: string
    alt?: string
    [x: string]: any 
}

const Image = (props) => {
  // disable linting here until "size" works (TODO)
  // eslint-disable-next-line
  const { src, collection = '', size, alt = 'image', ...rest } = props;

  const BUCKET_NAME = imageService.getBucketName(collection);
  const IMAGE_BUCKET_URL = `https://${BUCKET_NAME}.s3.amazonaws.com`;

  // check if the key is of url form or base64 encoded string
  const urlExpression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
  const regex = new RegExp(urlExpression);
  const imageSource = (src.includes(";base64,") || src.match(regex)) ? src : `${IMAGE_BUCKET_URL}/${src}`;

  return (
    <img {...rest} src={imageSource} alt={alt} loading="lazy"/>
  );
};

export default Image;
