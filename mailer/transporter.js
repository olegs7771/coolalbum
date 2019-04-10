const nodemailer = require("nodemailer");
const mailPass = require("../config/dev_keys").mailPass;

module.exports = function sendMail(data, cb) {
  //create htmlBody
  const htmlBody = `<b>From</b>
   <ul className='list-group'>

     <li>Name :${data.name}</li>
     <li>Company :${data.company}</li>
     <li>Email :${data.email}</li>
     </ul>
     <p>${data.message}</p>`;

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
  let info = transporter.sendMail(
    {
      from: '"CoolAlbum 👻" <coolalbum@coolalbum.info>', // sender address
      to: "olegs777@bezeqint.net", // list of receivers
      subject: "Greate Opportunity", // Subject line
      text: "Hello world?", // plain text body
      html: htmlBody // html body
    },
    (err, info) => {
      if (err) {
        console.log(err);
      }
      if (info) {
        if (info.messageId) {
          console.log("Message sent: %s", info.messageId);
          return cb(info);
        }
      }
    }
  );
};
