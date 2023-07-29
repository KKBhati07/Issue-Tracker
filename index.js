//importing express
const express=require("express");
//setting the port 
const port=process.env.PORT||3100;
const app = express();
//importing express layouts
const expressLayouts=require("express-ejs-layouts");

//importing database
const db = require("./config/mongoose");

//using decoder to read from POST requests
app.use(express.urlencoded({extended:true}));

//declaring static files path
app.use(express.static("./assets")); 


//setting express layouts
app.use(expressLayouts);
//to extract static files from sub pages into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

//routing all requests to routes
app.use("/",require("./routes/index"));



//setting the view engine
app.set("view engine","ejs");
//setting the path 
app.set("views","./views");


//staring the express server
app.listen(port,(error)=>{
    if(error){
         console.log(`Error starting the server: ${error}`); 
         return;}
    console.log(`server running on port: ${port}`);

});