const express = require("express");
const path = require("path");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const app =express();
dotenv.config({path:"./Config.env"})
require("./DataBaseConnection/Connection")
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(require("./Routers/Router"));
app.use(cookieParser());
//if(process.env.NODE_ENV == "production"){
 app.use(express.static("client/build"))
 app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "client","build", "index.html"));})
//}
app.listen(port,()=>{
    console.log("Successful");
}) 