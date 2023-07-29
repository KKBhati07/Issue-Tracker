//importing express
const express=require('express');
const router=express.Router();

//redirecting to V1 routes
router.use("/v1",require("./v1/index"));

//exporting router
module.exports = router;   