const express = require("express");
const app = express();
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
<<<<<<< HEAD

//testing route
router.get("/test", (req, res) => {
  res.app.io.emit("txt", { key: "value" });
});
=======
>>>>>>> ca88cddba95ae61ba89eff2b8e4be187b3c2e6a6

// Sending SMS
router.post(
  "/send",

  (req, res) => {
    const text = req.body.text,
      phone = req.body.phone,
      email = req.body.email;
    User.findOne({ email }).then(user => {
      console.log("user", user);
    });

    // nexmo.message.sendSms("Nexmo ", phone, text, (err, responseData) => {
    //   if (err) {
    //     console.log("err", err);
    //   } else {
    //     console.dir(responseData);
    //     //Get Data from responseData
    //     const data = {
    //       id: responseData.messages[0]["message-id"],
    //       number: responseData.messages[0]["to"]
    //     };
    //     //Emit Data to the Client
    //     req.app.io.emit("smsStatus", data);
    //   }
    // });

    res.status(200).json({ msg: "ok" });
  }
);

module.exports = router;
