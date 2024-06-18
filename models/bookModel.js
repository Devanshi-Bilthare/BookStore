const mongoose = require('mongoose')

const bookModel = new mongoose.Schema({
    bookImage:{
        type:String
    },
    title:{
        type:String
    },
    author:{
        type:String
    },
    genre:{
        type:String
    },
    desc:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'bookuser'
    }
},{timestamps:true})


const book = mongoose.model('book',bookModel)

module.exports = book