const nodemailer = require("nodemailer");

// Credentials for email account we send mail from

const credentials = {
  host: "smpt.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: account.user,
    pass: account.pass
  }
};

// Create reusable transporter

nodemailer.createTestAccount(err, account => {
  let transporter = nodemailer.createTransport({ credentials });
});
