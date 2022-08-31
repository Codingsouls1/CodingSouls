const mongoose = require("mongoose");
const validator = require("validator")
const EventSch = new mongoose.Schema({
    fname:{
        type:String,
        trim:true,
        require:true,
        lowercase:true,
        minLength:3,
        MaxLength:20,
        validate(value){
            if(!(/^[A-Za-z]+$/.test(value)))
            {
             throw new error("Invalid")
            }
         }
    },
    lname:{
        type:String,
        trim:true,
        require:true,
        lowercase:true,
        minLength:3,
        MaxLength:20,
        validate(value){
            if(!(/^[A-Za-z]+$/.test(value)))
            {
             throw new error("Invalid")
            }
         }
    },
    enrollment_number:{
        type:String,
        trim:true,
        require:true,
        lowercase:true,
        minLength:12,
        MaxLength:12,
        unique:true,
        validate(value){
           if(!(/[a-zA-Z]{2}\d{6}/.test(value)))
           {
            throw new error("Invalid")
           }
        }
        
    },
    email:{
        type:String,
        trim:true,
        require:true,
        lowercase:true,
        unique:true,
        validate(value){
           if(!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)))
           {
            throw new error("Invalid")
           }
        }
        
    },
    contact:{
        type:String,
        trim:true,
        require:true,
        lowercase:true,
        unique:true,
        validate(value){
           if(!(/^(0|[1-9][0-9]*)$/.test(value)))
           {
            throw new error("Invalid")
           }
        }
        
    },
    gender:{
        type:String,
        trim:true,
        require:true,
        lowercase:true,       
    },
    college:{
        type:String,
        trim:true,
        require:true,
        lowercase:true,       
    },
    branch:{
        type:String,
        trim:true,
        require:true,
        lowercase:true,       
    },
    year:{
        type:Number,
        trim:true,
        require:true,
        max:4,
        min:1      
    },
    semester:{
        type:Number,
        trim:true,
        require:true,
        max:8,
        min:1      
    },
    section:{
        type:String,
        trim:true,
        require:true,      
    },
    language:{
        type:String,
        trim:true,
        require:true, 
        lowercase:true    
    },
    tdate:{
        type:String,
        trim:true,
        require:true
    },
    time:{
        type:String,
        trim:true,
        require:true,
             
    },
    tid:{
        type:String,
        trim:true,
        require:true, 
        unique:true     
    },
    check:{
        type:String,
        trim:true,
        require:true,      
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const EventModel = new mongoose.model("EventData",EventSch);
const MemberModel = new mongoose.model("MemberData",EventSch);

module.exports = {EventModel,MemberModel};