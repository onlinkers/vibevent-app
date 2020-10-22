import crypto from "crypto";

/**
 * creates a random "MD5" hash
 */
export const createRandomHash = () => {
  // create image hash name
  const bytes = crypto.randomBytes(32);
  // create the md5 hash of the random bytes
  const imageHash = crypto.createHash("MD5").update(bytes).digest("hex");
  return imageHash;
};