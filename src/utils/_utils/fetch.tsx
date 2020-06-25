const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const encodeParams = (params) => {
  const paramKeys = Object.keys(params);
  const paramString = paramKeys.map((key) => {
    const value = key && params[key];
    if (
      !key ||
      !value ||
      (typeof value !== "string" && typeof value !== "boolean")
    ) {
      throw new Error(`Invalid url params: ${JSON.stringify(params)}`);
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
  });
  return `?${paramString.join("&")}`;
};

/**
 * The apiFetch allows a general method that makes requests for the backend API
 * The function recieves the following arguments:
 * @param {*} path - the request API path followed by a forward slash (eg: "/events")
 * @param {*} options - object consisting of the request "method", "headers", "params", "body"
 * Additional "middlewares" may be added to this backend fetch
 */

export const apiFetch = async (path, options) => {
  try {
    // Form the base url
    let url = `${BASE_URL}${path}`;

    // Check if a method was provided
    if(!options.method && options.body) throw new Error("A method was not provided for the request"); 
    const method = options.method || "GET"; // if not determined, default to 'GET'

    // Check if extra headers were provided
    const headers = {
      ...DEFAULT_HEADERS,
      ...(options.headers || {}),
    };

    // Check if params was provided and add to url
    if(options.params) url += encodeParams(options.params);

    // Check if a body was provided
    const body = options.body || null;

    return fetch(url, {
      method,
      headers,
      body,
    })
      .then(async (result) => {
        if (!result) return null;
        const data = await result.json();
        return data;
      })
      .catch((error) => {
        throw error;
      });
  } catch (err) {
    alert(err.message);
  }
};
