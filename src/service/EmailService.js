const { badRequest, serverError } = require("../utils/error");
const NodeMailerService = require("./NodeMailerService");

class EmailService {
  constructor() {}

  sendEmail = async (email, subject, body) => {
    let mailOptions = {
      from: `${process.env.EMAIL}`,
      to: email,
      subject: subject,
      text: body,
    };

    try {
      await NodeMailerService.send(mailOptions);
    } catch (err) {
      console.log("Err: email service--", err.message);
      throw serverError();
    }
  };
}

module.exports = new EmailService();
