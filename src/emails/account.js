const sgMail = require('@sendgrid/mail')
const { text } = require('express')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'richupulimoottil@gmail.com',
        subject: 'Welcome to Task App!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

module.exports = {
    sendWelcomeEmail
}