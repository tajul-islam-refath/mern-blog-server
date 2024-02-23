const { serverError } = require("../utils/error");
const { generateOTP, generateOTPHash, verifyOTPHash } = require("../utils/otp");
const { generateHash } = require("../utils/hashing");
const { signToken } = require("../utils/token");

class AuthService {
  constructor(userDatabase) {
    this.userDatabase = userDatabase;
  }

  /**
   * Send OTP by email
   * @param {string} email
   * @returns {object}
   */
  sendOTPByEmail = async (EmailService, email) => {
    let otp = generateOTP();
    await EmailService.sendOTPEmail(email);
    let hash = generateOTPHash(email, otp);
    return {
      hash,
      email,
    };
  };

  /**
   * Signup method
   * @param {object} data - Contain { username, email, otp, hash, password }
   * @returns {string} token
   */
  signup = async (data) => {
    let { username, email, otp, hash, password } = data;
    let existingUser = await this.userDatabase.findByEmail(email);
    if (existingUser) {
      throw badRequest("User already exists with this email");
    }

    let isVerified = verifyOTPHash(email, otp, hash);
    if (!isVerified) {
      throw badRequest("Invalied OTP");
    }

    let hashPassword = await generateHash(password, 11);

    let user = await this.userDatabase.create({
      email,
      password: hashPassword,
      username,
    });

    let token = await signToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    });

    return token;
  };
}

module.exports = AuthService;
