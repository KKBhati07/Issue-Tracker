//importing mongoose
const mongoose=require("mongoose");

//creating database
mongoose.connect("mongodb://127.0.0.1:/issue_tracker_database");
const db=mongoose.connection;
db.on("error",console.error.bind(console,"Error connecting to DB"));
db.once("open",()=>{
    console.log("Connected to database :: MongoDB");
});

//exporting database
module.exports=db;

