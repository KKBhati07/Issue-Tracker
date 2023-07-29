//importing express
const express=require('express');
const router=express.Router();

//importing home controller
const homeController=require("../controllers/home_controller");

//routing for APIs
router.use("/api", require("./api/index"));

//routing for projects
router.use("/projects", require("./projects"));

//routing for issues
router.use("/issues", require("./issues"));


//home router
router.use("/", homeController.home);


//exporting router
module.exports=router;