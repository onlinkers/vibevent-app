import React from "react";
import { createImageUrl } from "utils";

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

  // check if the key is of url form or base64 encoded string
  const imageSource = createImageUrl({ src, collection, size });

  return (
    <img {...rest} src={imageSource} alt={alt} loading="lazy"/>
  );
};

export default Image;
