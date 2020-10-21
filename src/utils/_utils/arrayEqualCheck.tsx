/**
 * Helper function that checks if two arrays have the same element
 * @param _arr1 - the first array
 * @param _arr2 - the second array
 * @param checkOrder - optional paramater which tries to check the order of the array
 */

export const arrayEqualCheck = (_arr1, _arr2, checkOrder = false) => {

  if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length)
    return false;

  let arr1 = _arr1.concat();
  let arr2 = _arr2.concat();

  // if the order doesn't matter
  if(!checkOrder) {
    arr1 = arr1.sort();
    arr2 = arr2.sort();
  }

  for (let i = 0; i < arr1.length; i++) {

    if (arr1[i] !== arr2[i])
      return false;

  }

  return true;

};