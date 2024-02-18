const otpGenerator = require("otp-generator");
const crypto = require("crypto");

/**
 * Generate 6 digit OTP
 * @returns {number} a 6 digit number
 */
const generateOTP = () => {
  const otp = otpGenerator.generate(6, {
    alphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  return otp;
};

/**
 * Generates a salted and time-bound hashed OTP to prevent unauthorized password resets.
 *
 * @param {string} email - The user's email address.
 * @param {string} otp - The one-time password (OTP) generated on the client-side.
 * @param {number} time - The time represent expiration time default(1hr)
 * @returns {string} The combined hash and expiration timestamp, separated by a period ('.').
 */
const generateOTPHash = (email, otp, time = 60 * 60 * 1000) => {
  //   let time = 60 * 60 * 1000; // 1hr
  let exTime = Date.now() + time;

  let hashObj = `${email}.${otp}.${exTime}`;
  let hash = crypto
    .createHmac("sha256", process.env.OTP_KEY)
    .update(hashObj)
    .digest("hex");
  let fullHash = `${hash}.${exTime}`;

  return fullHash;
};

/**
 * Verify existing hash
 *
 * @param {string} email - The user email address.
 * @param {string} otp - The one-time password (OTP) generated on the client-side.
 * @param {string} fullHash - The existing generated hash
 * @returns {boolean} If hash matched return true otherwise false
 */
const verifyOTPHash = (email, otp, fullHash) => {
  let [hash, exTime] = fullHash.split(".");

  if (Date.now() > exTime) return false;

  let hashObj = `${email}.${otp}.${exTime}`;
  let newhash = crypto
    .createHmac("sha256", process.env.OTP_KEY)
    .update(hashObj)
    .digest("hex");

  if (newhash == hash) return true;
  return false;
};

module.exports = {
  generateOTP,
  generateOTPHash,
  verifyOTPHash,
};
