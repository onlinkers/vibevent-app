export const createQueryString = (queries: { [key: string]: any }):string => {
  const queryList = Object.entries(queries)
    .map(([index, value]) => `${index}=${value}`);
  return queryList.join("&");
};