const mongoose = require("mongoose");

const togglesch = new mongoose.Schema({
    Event:{
        type:Boolean,
        require:true,
    },
    Member:{
        type:Boolean,
        require:true,
    }
})

const toggleModel = new mongoose.model("toggleData",togglesch);
module.exports= toggleModel;