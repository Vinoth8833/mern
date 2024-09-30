const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    Name:{
        type:String,
        require:true,
    },
    Age:{
        type:Number,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Phone:{
        type:Number,
        require:true
    }

})

const userModel = mongoose.model('userDetails',userShema)
module.exports = userModel