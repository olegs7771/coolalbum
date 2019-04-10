const express = require("express");
const router = express.Router();

const validationEmailFormInput = require("../validation/emailForm");
const passport = require("passport");

const sendMail = require("../../mailer/transporter");

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

    const { message } = sendMail(req.body);
    console.log("message", message);

    //sending req.body to data  /transporter module
  }
);
module.exports = router;
