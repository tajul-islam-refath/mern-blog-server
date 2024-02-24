const { serverError, badRequest } = require("../utils/error");
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
    let { username, email, password } = data;

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

  /**
   * Login method
   * @param {object} data - Contain {  email,  password }
   * @returns {string} token
   */
  login = async (data) => {
    let { email, password } = data;
    let existingUser = await this.userDatabase.findByEmail(email);
    let token = await signToken({
      _id: existingUser._id,
      username: existingUser?.username,
      email: existingUser?.email,
      profileImage: existingUser?.profileImage,
    });

    return token;
  };

  forgotPassword = async (data) => {
    let { email, otp, hash, password } = data;

    let existingUser = await this.userDatabase.findByEmail(email);
    if (!existingUser) {
      throw badRequest("Invalied cradentials");
    }

    let isVerified = verifyOTPHash(email, otp, hash);
    if (!isVerified) {
      throw badRequest("Invalied cradentials");
    }

    let hashPassword = await generateHash(password, 11);

    await this.userDatabase.findByEmailAndUpdate(email, {
      password: hashPassword,
    });
  };
}

module.exports = AuthService;
