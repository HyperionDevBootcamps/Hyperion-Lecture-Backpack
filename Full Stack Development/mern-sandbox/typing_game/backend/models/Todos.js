const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: Number
})

const model = mongoose.model('Todo', todoSchema);

module.exports = model;