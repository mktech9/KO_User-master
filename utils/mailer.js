"use server";

import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.clientId,
  process.env.clientSecret,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.refreshToken,
});

const accessToken = oauth2Client.getAccessToken();
const vendor = await SetLabel();

export const sendMail = (userEmail, body, subject, attach) => {
  return new Promise((resolve, reject) => {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.ADMIN_EMAIL,
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken,
      },
    });

    var mailOptions = {
      to: userEmail,
      from: `${vendor?.name} <${process.env.ADMIN_EMAIL}>`,
      subject: subject,
      html: body,
      attachments: attach,
    };

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Email sent successfully!");
      }
    });
  });
};
