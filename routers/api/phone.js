const express = require("express");
const router = express.Router();
const passport = require("passport");
//Bring in Model (models/User.js)
const User = require("../../models/User");
const Nexmo = require("nexmo");

// init nexmo sms sending

const nexmo = new Nexmo(
  {
    apiKey: "5b8b4a3e",
    apiSecret: "dCstfbHMktqY7LIC"
  },
  { debug: true }
);
//testing route
router.get("/test", (req, res) => {
  res.app.io.emit("txt", { key: "value" });
});

// Sending SMS
router.post(
  "/send",

  (req, res) => {
    console.log("req.body", req.body);
    const text = req.body.text,
      phoneNumber = req.body.phoneNumber;

    nexmo.message.sendSms("Nexmo ", phoneNumber, text, (err, responseData) => {
      if (err) {
        console.log("err", err);
      } else {
        console.dir(responseData);
        //Get Data from responseData
        const data = {
          id: responseData.messages[0]["message-id"],
          number: responseData.messages["to"]
        };
        //Emit Data to the Client
        // app.io.emit("smsStatus", data);
      }
    });

    res.status(200).json({ msg: "ok" });
  }
);

module.exports = router;
