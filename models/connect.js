const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://devanshibilthare:hmE%40gUcFn5_hHJY@cluster0.jdknsuw.mongodb.net/devanshibilthare?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('connected'))
.catch(err => console.log(err))