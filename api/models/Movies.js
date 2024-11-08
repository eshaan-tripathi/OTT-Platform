const { model } = require("mongoose");
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title:{
        type:String,  
        required:true,
        unique:true
    },
    desc:{
        type:String, 
    },
    img:{
        type:String,  
    },
    trailer:{
        type:String,
    },
});

module.exports = mongoose.model('Movie', MovieSchema);