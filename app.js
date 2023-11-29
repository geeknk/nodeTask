const express = require("express");
const cookieparser = require("cookie-parser")
const service = require("./config/constant.js");
const userRoute = require("./routes/userRoute.js");
const rdcon = require("./config/redisconfig.js")

const app = express();

app.use(express.json());
app.use(cookieparser())
app.use("/user", userRoute)
rdcon.redisconnect();
app.listen(service.port,()=>{
    console.log("server is running");
})