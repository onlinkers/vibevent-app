/**
 * Filters an array (1st argument) by the values in the second array (2nd argument)
 * @param subjectArray - array of entries to filter
 * @param filterArray - array of entries that we don't want in the result
 * When using the function, recommend strict checking of the element types
 * before being passed as arguments of the function
 */
export const filterArrayByArray = (subjectArray: any[], filterArray: any[] = []) => {
  if(!filterArray.length) return subjectArray;
  return subjectArray.filter((entry) => {
    return !filterArray.includes(entry);
  });
};