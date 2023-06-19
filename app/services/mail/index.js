const nodemailer = require('nodemailer');
const { gmail, password } = require('../../config');
const Mustache = require('mustache');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: gmail,
    pass: password,
  },
});

const announcementMail = async (email,dataUser) => {
  try {
    let template = fs.readFileSync('app/views/email/otp.html', 'utf8');

    let message = {
      from: gmail,
      to: email,
      subject: 'Congratss : ',
      html: Mustache.render(template,dataUser),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { announcementMail };
