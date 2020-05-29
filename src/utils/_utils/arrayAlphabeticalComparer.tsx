/**
 * Helper function that gets plugged into a `.sort()` array function.
 * The alphabeticalComparer hepls sort array entries by their alphabetical order
 * @param property - optional property field for if we are comparing two arrays of objects
 */
export const arrayAlphabeticalComparer = (property?: string) => (a: string, b: string) => {
    let top, bot;
    if(property) {
        top = a[property] ? a[property].toLowerCase() : "";
        bot = b[property] ? b[property].toLowerCase() : "";
    }
    else {
        top = a ? a.toLowerCase() : "";
        bot = b ? b.toLowerCase() : "";
    }
    return top !== bot ? (top > bot ? 1 : -1 ) : 0;
};