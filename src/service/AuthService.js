const { validationResult } = require("express-validator");
const EmailService = require("./EmailService");
const validationFormater = "../utils/validationFormater";
const { serverError } = require("../utils/error");
const { generateOTP, generateOTPHash } = require("../utils/otp");

class AuthService {
  constructor() {}

  /**
   * Send OTP by email
   * @param {string} email
   * @returns {object}
   */
  sendOTPByEmail = async (email) => {
    let otp = generateOTP();
    await EmailService.sendEmail(
      email,
      "OTP for authentication",
      `Your OTP is ( ${otp} )`
    );
    let hash = generateOTPHash(email, otp);
    return {
      hash,
      email,
    };
  };

  signup = async (body) => {
    let { userName, email, otp, hash, password } = body;
  };
}

module.exports = new AuthService();
