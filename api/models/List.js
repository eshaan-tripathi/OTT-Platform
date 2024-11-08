const { model } = require("mongoose");
const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title:{
        type:String,  
        required:true,
        unique:true
    },
    genre:{
        type:String,  
    },
    content:{
        type:Array,
    },
});

module.exports = mongoose.model("List",ListSchema);