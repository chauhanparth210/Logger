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

const sendEmailToHost = user => {
  const mailOptions = {
    from: `"No Reply" <${process.env.EMAIL}>`,
    to: `${user.hostEmail}`,
    subject: "Visitor Information",
    html:
      `Visitor's Information<br><br>` +
      `Name:${user.name}<br>` +
      `Email:${user.email}<br>` +
      `Phone Number:${user.phone}<br>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log("Message sent: %s", info.messageId);
  });
};

const sendEmailToVisitor = user => {
  const mailOptions = {
    from: `"No Reply" <${process.env.EMAIL}>`,
    to: `${user.email}`,
    subject: "Thank you",
    html:
      `<h3>Thank you for visting us.</h3><br><br>` +
      `Name:${user.name}<br>` +
      `Email:${user.email}<br>` +
      `Phone Number:${user.phone}<br>` +
      `CheckIn:${user.checkIn}<br>` +
      `CheckOut:${user.checkOut}<br>`
    //`Host:${user.hostName}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log("Message sent: %s", info.messageId);
  });
};

module.exports = {
  sendEmailToHost,
  sendEmailToVisitor
};
