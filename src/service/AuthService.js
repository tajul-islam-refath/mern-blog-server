const { serverError, badRequest } = require("../utils/error");
const { generateOTP, generateOTPHash, verifyOTPHash } = require("../utils/otp");
const { generateHash } = require("../utils/hashing");
const { signToken } = require("../utils/token");
const cloudinary = require("../config/cloudinary.config");

class AuthService {
  constructor() {}

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
   * @param {UserRepository} UserRepository
   * @param {object} data - Contain { username, email, otp, hash, password }
   * @returns {string} token
   */
  signup = async (UserRepository, data) => {
    let { username, email, password, image } = data;

    let imageResponse = await cloudinary.uploader.upload(image.path, {
      folder: process.env.CLOUDINARY_Folder,
    });

    let hashPassword = await generateHash(password, 11);
    let user = await UserRepository.create({
      email,
      password: hashPassword,
      username,
      profileImage: {
        publicId: imageResponse.public_id,
        url: imageResponse.url,
      },
    });

    let token = await signToken(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
      process.env.JWT_SECRET
    );

    return token;
  };

  /**
   * Login method
   * @param {object} data - Contain {  email,  password }
   * @returns {string} token
   */
  login = async (UserRepository, data) => {
    let { email, password } = data;
    let existingUser = await UserRepository.findByEmail(email, {
      username: 1,
      email: 1,
      profileImage: 1,
    });

    let token = await signToken(
      {
        _id: existingUser._id,
        username: existingUser?.username,
        email: existingUser?.email,
        profileImage: existingUser?.profileImage,
      },
      process.env.JWT_SECRET
    );

    return token;
  };

  forgotPassword = async (UserRepository, data) => {
    let { email, otp, hash, password } = data;

    let existingUser = await UserRepository.findByEmail(email);
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

module.exports = new AuthService();
