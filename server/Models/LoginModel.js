const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true,
        trim:true,
        lowercase:true,
        minLength:5,
        maxLength:15
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email");
            }
        }
    },
    password:{
         type:String,
         require:true,
         unique:true,
         trim:true,
         },
    date:{
        type:Date,
        default:Date.now
    },
    tokens:[
        {
            token:{
                type:String,
                require:true,
            }
        }
    ]
})
LoginSchema.methods.generateAutoToken= async function () {
       try{
        const token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
       this.tokens = this.tokens.concat({token:token})
       await this.save();
       return token;
       }catch(err){
        console.log(err);
       }
}

const LoginModel = new  mongoose.model("AdminLogin",LoginSchema);

module.exports = LoginModel;