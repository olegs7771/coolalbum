const express = require("express");
const router = express.Router();

const validationEmailFormInput = require("../validation/emailForm");
const passport = require("passport");

const sendMail = require("../../mailer/transporter");

// Sending Email Message

router.post("/sendEmail", (req, res) => {
  //First Line of validation
  const { isValid, errors } = validationEmailFormInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  sendMail(req.body, response => {
    console.log(response.messageId);
    if (response.messageId) {
      res.json({ msg: "Thank You. Your message has been sent." });
    }
  });
});
module.exports = router;
