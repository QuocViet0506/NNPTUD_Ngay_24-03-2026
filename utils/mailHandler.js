const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
        user: "ea1570d8b02b30",
        pass: "0bec1012c923f8",
    },
});

module.exports = {
    sendMail: async (to,url) => {
        const info = await transporter.sendMail({
            from: 'Admin@hahah.com',
            to: to,
            subject: "request resetpassword email",
            text: "click vao day de reset", // Plain-text version of the message
            html: "click vao <a href="+url+">day</a> de reset", // HTML version of the message
        });

        console.log("Message sent:", info.messageId);
    }
}