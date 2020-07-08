/**
 * The function parses if need to. No errors will be thrown if the string cannot be parsed
 * @param str - string to parse.
 */
export const parse = (str: string) => {
  try {

    const parsed = JSON.parse(str);
    return parsed;
        
  }
  catch(err) {

    return str;

  }
};