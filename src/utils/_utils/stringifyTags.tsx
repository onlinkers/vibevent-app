import { input } from "aws-amplify";

export const stringifyTags = (inputArray: string[]) => {
  if (inputArray.length < 2) {
    return inputArray[0];
  } else {
    let tagString = "";
    const split = inputArray.slice(0, inputArray.length);
    split.map((el: string) => {
      tagString += el + " • ";
    });
    tagString += inputArray[inputArray.length];
    return tagString;
  }
};
