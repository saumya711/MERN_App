const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, send_from, reply_to) => {
    // Create Email Transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    //Option for sending email
    const options = {
        from: send_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message,
    }

    // send email
    transporter.sendMail(option, function (err, info) {
        if(err) {
            console.log(err)
        }
        console.log(info)
    })
}