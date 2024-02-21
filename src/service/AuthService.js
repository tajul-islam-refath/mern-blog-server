const { serverError } = require("../utils/error");
const { generateOTP, generateOTPHash } = require("../utils/otp");
const EmailService = require("./EmailService");

class AuthService {
  constructor() {}

  sendOtp = async (email) => {
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
}

module.exports = new AuthService();
