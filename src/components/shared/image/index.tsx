import React from "react";

interface Props {
    src: string
    size?: string
    [x: string]: any 
}

const IMAGE_BUCKET_URL = process.env.NODE_ENV === "production" ? "https://onlinker-image-prod.s3.amazonaws.com" :
  "https://onlinker-stage-prod.s3.amazonaws.com";

const Image = (props) => {
  // disable linting here until "size" works (TODO)
  // eslint-disable-next-line
  const { src, size, ...rest } = props;

  // check if the key is of url form or base64 encoded string
  const urlExpression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
  const regex = new RegExp(urlExpression);
  const imageSource = (src.includes(";base64,") || src.match(regex)) ? src : `${IMAGE_BUCKET_URL}/src`;

  return (
    <img {...rest} src={imageSource} alt={props.alt || "image"} loading="lazy"/>
  );
};

export default Image;
