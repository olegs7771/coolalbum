const express = require("express");
const app = express();
const router = express.Router();

const passport = require("passport");
//Bring in Model (models/User.js)
const User = require("../../models/User");
const Nexmo = require("nexmo");
var randomize = require("randomatic");
const jwt = require("jsonwebtoken");
const keys = require("../../config/dev_keys").secredOrKey;

// init nexmo sms sending

const nexmo = new Nexmo(
  {
    apiKey: "5b8b4a3e",
    apiSecret: "dCstfbHMktqY7LIC"
  },
  { debug: true }
);

// Sending SMS
router.post(
  "/send",

  (req, res) => {
    console.log("req.body", req.body);
    const email = req.body.email;
    User.findOne({ email })
      .then(user => {
        console.log("user", user);
        if (!user) {
          return res.status(400).json({ loginSmsEmail: "No Such E-mail" });
        }
        //user been found
        // res.status(200).json({ message: "Email is validated!" });
        const phone = req.body.phone;
        //Check for User's phone number
        User.findOne({ phone }).then(user => {
          if (!user) {
            return res.status(400).json({ phone: "not valid number" });
          } else {
            //randomatic gens  6 digit number
            const randomNum = randomize("0", 6);
            res.status(200).json(randomNum);
            const objNum = {
              randomNum
            };
            User.findOneAndUpdate(
              { email },
              {
                $set: objNum
              },

              { new: true }
            )
              .then(update => {
                console.log("update", update.randomNum);
                // user db has randomNum
                //Sending Nexmo SMS message to user
                const text = `Dear ${update.name},Your code for login is ${
                  update.randomNum
                }.`;
                nexmo.message.sendSms(
                  "Nexmo ",
                  phone,
                  text,
                  (err, responseData) => {
                    if (err) {
                      console.log("err", err);
                    } else {
                      console.dir(responseData);
                      //Get Data from responseData
                      const data = {
                        id: responseData.messages[0]["message-id"],
                        number: responseData.messages[0]["to"]
                      };
                      //Emit Data to the Client
                      req.app.io.emit("smsStatus", data);
                    }
                  }
                );
              })
              .catch(err => {
                console.log(err);
              });
          }
        });

        const text = req.body.text;
      })
      .catch(err => {
        console.log(err);
      });
  }
);

router.post("/code", (req, res) => {
  console.log("req.body", req.body);
  const randomNum = req.body.code;
  User.findOne({ randomNum }).then(user => {
    if (!user) {
      return res.status(400).json({ code: "Wrong code" });
    }
    console.log("user", user);

    //randomNum match! create token for further login
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      location: user.location,
      bio: user.bio,
      date: user.date
    };
    //creating token for exp 10h
    jwt.sign(payload, keys, { expiresIn: 36000 }, (err, token) => {
      res.json({ code: randomNum, token: "bearer  " + token });
    });
  });
});

module.exports = router;
