"use Strict"

const nodemailer = require('nodemailer');

module.exports = function sendMail(to, subject, message) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cakmak4834@gmail.com',
            pass: 'txax rxmm powo hrge'
        }
    });

    // Send Mail // Google -> AccountHome -> Security -> Two-Step-Verify (make it on) -> App-Passwords (if not showing use this link: https://myaccount.google.com/apppasswords)
    transporter.sendMail({
        from: 'cakmak4834@gmail.com',
        to: to,
        subject: subject,
        text: message,
        html: message

    }, function (error, success) {

        success ? console.log('SUCCESS:', success) : console.log('ERROR:', error);
    })
}