const { badRequest, serverError } = require("../utils/error");
const NodeMailerService = require("./NodeMailerService");

class EmailService {
  constructor() {
    this.mailService = NodeMailerService;
  }

  sendOTPEmail = async (email, otp) => {
    let mailOptions = {
      from: `${process.env.EMAIL}`,
      to: email,
      subject: "You reacived a 6 degit OTP",
      text: `This is your otp ( ${otp} )`,
    };

    try {
      await this.mailService.send(mailOptions);
    } catch (err) {
      throw serverError("Email send faield!");
    }
  };
}

module.exports = new EmailService();
