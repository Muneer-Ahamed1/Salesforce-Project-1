const express = require("express");
const accountRoute = require("./src/routes/accountRoute.js");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const contactRoute=require("./src/routes/contactRoute.js");
const errorController=require("./src/utils/errorController.js");
const loginRoute=require("./src/routes/userRoute.js");
const app = express();
var cookieParser = require('cookie-parser');
dotenv.config({
    path:path.join(__dirname,"/config.env")
})
app.use(cors({
    origin: true, 
    credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "developnment") {
    app.use(morgan("dev"));
}
app.use("/",loginRoute);
app.use("/accountObject", accountRoute);
app.use("/contactObject",contactRoute)
app.use("*",(req,res)=>{
    res.status(404).json({message:"Route is not present"});
    
})
const port = process.env.PORT || 8080;
app.use(errorController);

app.listen(port, () => {
    console.log("listening on " + port);
});
