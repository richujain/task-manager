const sgMail = require('@sendgrid/mail')
const { text } = require('express')

const sendgridAPIKey = ''

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'richupulimoottil@gmail.com',
        subject: 'Welcome to Task App!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'richupulimoottil@gmail.com',
        subject: 'We are going to miss you!',
        text: `Goodbye ${name}. Is there anything we could've done to kept you on board?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}