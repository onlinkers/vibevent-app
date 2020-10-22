import api from "../api";
import { apiErrorHandler } from "../popup";

let BUCKET_ENV = "stage";
if(process.env.NODE_ENV === "production") BUCKET_ENV = "prod";
else if(process.env.NODE_ENV === "development") BUCKET_ENV = "stage";

export default {
  BUCKET_NAME: `vibevent-image-${BUCKET_ENV}`,
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
