const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = Schema({
    comment: String,
    user: String,
    date: String
})

module.exports = mongoose.model('Comment', CommentSchema)