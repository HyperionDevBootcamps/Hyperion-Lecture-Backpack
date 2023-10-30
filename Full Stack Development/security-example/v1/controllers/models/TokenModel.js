const mongoose = require(`mongoose`)
const idValidator = require('mongoose-id-validator')
mongoose.Promise = global.Promise
const { Schema } = mongoose

const Token = Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: `Users` },
  token: { type: String, required: true },
  created: { type: Date, default: Date.now, expires: 3600 },
})
Token.plugin(idValidator)
// Export function to create Token model class
module.exports = mongoose.model(`Token`, Token)
