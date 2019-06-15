const nodemailer = require("nodemailer");
const mailPass = require("../config/dev_keys").mailPass;

module.exports = function sendMail(data, cb) {
  console.log("data in mailer", data);

  //create htmlBody for email (contact us)
  const htmlBody = `<b>From</b>
   <ul className='list-group'>

     <li>Name :${data.name}</li>
     <li>Company :${data.company}</li>
     <li>Email :${data.email}</li>
     </ul>
     <p>${data.text}</p>`;

  //create htmlBody for registration confirmation
  const htmlRegBody = `Dear ${data.name} </br>
  We have received  a request to authorize this email on CoolAlbum website
  Please  <a href=${data.URL}>confirm</a>   to complete your registration
  `;
  // create htmlBody for recovering password
  const htmlRecoverBody = `Dear ${data.name}, please <a href=${
    data.URL
  }>follow this</a>  link to create your new password.
  `;

  let html;

  if (data.register === "Register") {
    html = htmlRegBody;
  }
  // if (data.name) {
  //    (html = htmlBody);
  // }
  // if (data.recover) {
  //    (html = htmlRecoverBody);
  // }

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
      subject: "CoolAlbum", // Subject line
      text: "Hello world?", // plain text body
      html // html body
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
