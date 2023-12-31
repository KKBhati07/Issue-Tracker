//importing mongoose
const mongoose=require("mongoose");

const mongoUri=process.env.MONGO_URI||"mongodb://127.0.0.1:/issue_tracker_database"

//creating database
mongoose.connect(mongoUri);
const db=mongoose.connection;
db.on("error",console.error.bind(console,"Error connecting to DB"));
db.once("open",()=>{
    console.log("Connected to database :: MongoDB");
});

//exporting database
module.exports=db;

