const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const validationEmailFormInput = require("../validation/emailForm");
const passport = require("passport");
const mailPass = require("../../config/dev_keys").mailPass;

// Sending Email Message

router.post(
  "/sendEmail",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //First Line of validation
    const { isValid, errors } = validationEmailFormInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(req.body);
    //NodeMailer api
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "185.197.74.181",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "coolalbum@coolalbum.info", // generated ethereal user
        pass: mailPass // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // send mail with defined transport object
    let info = transporter
      .sendMail({
        from: '"Fred Foo 👻" <coolalbum@coolalbum.info>', // sender address
        to: "olegs777@bezeqint.net", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
      })
      .then(info => {
        console.log("Message sent: %s", info.messageId);
      })
      .catch(err => console.log(err));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
);
module.exports = router;
