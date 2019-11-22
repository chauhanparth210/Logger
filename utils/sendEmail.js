const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  secureConnection: "false",
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false
  }
});

const sendEmailToHost = email => {
  //to-do
  //fetch the name of host and put in subject and also fetch visitor's details
  const mailOptions = {
    from: `"No Reply" <${process.env.EMAIL}>`,
    to: `${email}`,
    subject: "",
    html: ``
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log("Message sent: %s", info.messageId);
  });
};

module.exports = {
  sendEmailToHost
};
