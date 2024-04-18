const mongoose = require('mongoose')

const bookModel = new mongoose.Schema({
    title:String,
    author:String,
    price:String,
    genre:String,
    language:String,
    desc:String
})

const Books = mongoose.model('books',bookModel)

module.exports = Books