require("dotenv").config();
const TeleSignSDK = require("telesignsdk");

const customerId = process.env.customerId;
const apiKey = process.env.apiKey;
const rest_endpoint = process.env.rest_endpoint;
const timeout = 10 * 1000; // 10 secs
const messageType = "ARN";

const client = new TeleSignSDK(customerId, apiKey, rest_endpoint, timeout);

const sendSMS = visitor => {
  const phoneNumber = `${visitor.hostPhone}`;
  const message =
    `Name:${visitor.name}` +
    `Email:${visitor.email}` +
    `Phone Number:${visitor.phone}`;
  const messageCallback = (error, responseBody) => {
    if (error === null) {
      console.log(
        `Messaging response for messaging phone number: ${phoneNumber}` +
          ` => code: ${responseBody["status"]["code"]}` +
          `, description: ${responseBody["status"]["description"]}`
      );
    } else {
      console.error("Unable to send message. " + error);
    }
  };
  client.sms.message(messageCallback, phoneNumber, message, messageType);
};

module.exports = {
  sendSMS
};
