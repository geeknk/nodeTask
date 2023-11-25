const express = require("express");
const service = require("./config/constant.js");
const userRoute = require("./routes/userRoute.js");

const app = express();

app.use(express.json());

app.use("/user", userRoute)

app.listen(service.port,()=>{
    console.log("server is running");
})