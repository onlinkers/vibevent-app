import api from "../api";
import { apiErrorHandler } from "../popup";

let BUCKET_ENV = "stage";
if(process.env.REACT_APP_ENVIRONMENT === "production") BUCKET_ENV = "prod";
else if(process.env.REACT_APP_ENVIRONMENT === "development") BUCKET_ENV = "dev";

export default {
  getBucketName: (collection = "") => {
    if(collection) return `vibevent-images-${collection}-${BUCKET_ENV}`;
    else return `vibevent-images-${BUCKET_ENV}`;
  },
  getPresignedUrl: async({ payload, options = {} }) => {
    try {
      const url = "/images";
      const results = await api.post(url, payload, options);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  usePresignedUrl: async({ url, payload, options = {} }) => {
    try {
      const results = await api.put(url, payload, options);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  }
};
