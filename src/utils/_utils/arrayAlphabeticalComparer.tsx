
export const arrayAlphabeticalComparer = (property: string | null) => (a: string, b: string) => {
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