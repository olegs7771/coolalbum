const nodemailer = require("nodemailer");
const mailPass = require("../config/keys").mailPass;

module.exports = function sendMail(data, cb) {
  console.log("data in mailer", data);

  let html;

  //create htmlBody for email (contact us)
  let htmlBody;
  if (data.emailContact) {
    htmlBody = `<b>From</b>
    <ul className='list-group'>
 
      <li>Sender:${data.name}</li>
      <li>Company :${data.company}</li>
      <li>From :${data.email}</li>
      </ul>
      <p>${data.text}</p>`;
    html = htmlBody;
  }

  //create htmlBody for registration confirmation
  let htmlRegBody;
  let to;
  if (data.register) {
    htmlRegBody = `Dear ${data.name} </br>
    We have received  a request to authorize this email on CoolAlbum website
    Please  <a href=${data.urlReg}>confirm</a>   to complete your registration
    `;
    html = htmlRegBody;
    to = data.email;
    console.log("html register");
    console.log("to ", to);
  }
  // create htmlBody for recovering password
  let htmlRecoverBody;
  if (data.recover) {
    console.log("html recover");
    htmlRecoverBody = `Dear ${data.name}, please <a href=${data.urlReg}>follow this</a>  link to create your new password.
   `;
    html = htmlRecoverBody;
    to ? (to = data.email) : (to = "olegs777@bezeqint.net");
    to = data.email;

    console.log("html recover");
    console.log("to ", to);
  }
  if (to === undefined) {
    to = "olegs777@bezeqint.net";
  }
  // let transporter = nodemailer.createTransport({
  //   host: "185.197.74.181",
  //   port: 465,
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: "coolalbum@coolalbum.info", // generated ethereal user
  //     pass: mailPass // generated ethereal password
  //   },
  //   tls: {
  //     rejectUnauthorized: false
  //   }
  // });
  let transporter = nodemailer.createTransport({
    host: "smtp.googlemail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "olegs7771", // generated ethereal user
      pass: "maspena0503054422" // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  // send mail with defined transport object
  let info = transporter.sendMail(
    {
      from: '"CoolAlbum 👻" <coolalbum@coolalbum.info>', // sender address
      to, // list of receivers//to ---> email of recover user
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
