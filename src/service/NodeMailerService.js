const nodemailer = require("nodemailer");

class NodeMailerService {
  constructor() {
    if (!NodeMailerService.transporter) {
      NodeMailerService.transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
    }
  }

  send = (options) => {
    return NodeMailerService.transporter.sendMail(options);
  };
}

module.exports = new NodeMailerService();
