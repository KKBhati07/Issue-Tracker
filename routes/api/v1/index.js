//importing express
const express=require('express');
const router=express.Router();

//redirecting to projects routes
router.use("/projects",require("./projects"));


//redirecting to issues routes
router.use("/issues",require("./issues"));

//exporting router
module.exports = router;   