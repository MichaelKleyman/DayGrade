//this is where we'll create our transporter from nodemailer and then export it out into any API routes we need it in.
//creating it in one place as opposed to making it at every request
import nodemailer from 'nodemailer';

const email = process.env.EMAIL;
const pass = process.env.PASS;

export const transporter = nodemailer.createTransport({
  service: 'gmail', //because I am using a gmail account
  auth: {
    //use environment variables for username and password
    user: email,
    pass,
  },
});

export const mailOptions = {
  //using my own email due to the user not giving us access to use their email and send an email on their behalf, so when they send a message I will send that mail to myself and Ill know who it is based on the contact info provided.
  from: email,
  to: email,
};
