const _ = require('lodash');
const nodemailer = require('nodemailer');
require('dotenv').config();

const config = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD // App password
    }
};

const transporter = nodemailer.createTransport(config);

// verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('Error connecting nodemailer transport:', error);
    } else {
        console.log("Server is ready to take our messages".yellow);
    }
});

const defaultMail = {
    from: process.env.EMAIL,
    to: 'testing...'
};

const send = (to, subject, html) => {

    // default setting
    mail = _.merge({ html }, defaultMail, to);

    transporter.sendMail(mail, (err, info) => {
        if (err) {
            console.log('Error sending email via nodemailer', err);
            return;
        }

        console.log('mail sent', info.response)
    })
}

module.exports = {
    send
}