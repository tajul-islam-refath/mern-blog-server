const bcrypt = require("bcryptjs");

/**
 * Genarate password hash
 * @param {string} payload
 * @param {number} saltRound
 * @returns {string}
 */
const generateHash = async (payload, saltRound = 10) => {
  const salt = await bcrypt.genSalt(saltRound);
  return bcrypt.hash(payload, salt);
};
/**
 * Compare hash
 * @param {string} payload
 * @param {string} hash
 * @returns {boolean}
 */
const compareHash = async (payload, hash) => {
  const result = await bcrypt.compare(payload, hash);
  return result;
};

module.exports = {
  generateHash,
  compareHash,
};
