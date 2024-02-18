const jwt = require("jsonwebtoken");

/**
 * ---- Sign the Token ----
 * @param {object} payload - Token payload
 * @param {string} secretKey - Token secret key
 * @param {string} expiresIn - Token expire time
 * @returns {string} JWT token
 */
const signToken = (payload, secretKey = "MY-SECRET", expiresIn = "1h") => {
  return JWT.sign(payload, secretKey, { expiresIn });
};

/**
 * ----- Verify Token ----
 * @param {string} token - JWT token
 * @param {string} secretKey - Token secret key
 * @returns {string}
 */
const verifyToken = (token, secretKey = "MY-SECRET") => {
  return JWT.verify(token, secretKey);
};

module.exports = {
  signToken,
  verifyToken,
};
