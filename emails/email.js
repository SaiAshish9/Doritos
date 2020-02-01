require("dotenv").config();
const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = process.env.SENDGRID_KEY



sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'feelathome@doritos.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'feelathome@doritos.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}


const sendConfirmationEmail = (email, name,id) => {
    sgMail.send({
        to: email,
        from: 'feelathome@doritos.com',
        subject: 'Please verify your password modification request',
        // text: ` ${name} please click on this confirmation link http://localhost:3000/${id}/newpassword`
         text: ` ${name} please open this link in the browser https://doritos.herokuapp.com/${id}/newpassword`

    })
}

const sendUserEmail = (email, name,message) => {
    sgMail.send({
        to: email,
        from: 'feelathome@doritos.com',
        subject: 'Query Message',
        // text: ` ${name} please click on this confirmation link http://localhost:3000/${id}/newpassword`
         text: `${name} : ${message}`

    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
    sendConfirmationEmail,
    sendUserEmail
}
