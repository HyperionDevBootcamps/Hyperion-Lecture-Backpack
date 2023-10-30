const config = require('../../server-settings.json')
const nodemailer = require(`nodemailer`)
const emailService = {
  sendEmail: (data) => {
    const transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: false,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    })
    let from = config.email.from
    const response = transporter.sendMail({ from, ...data }).catch((err) => {
      console.log('Email not found')
    })
  },
}
module.exports = emailService
