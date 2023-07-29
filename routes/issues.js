//importing express
const express=require('express');
const router=express.Router();

//importing issues controller
const issuesController = require("../controllers/issues_controller");

//to create a project
router.post("/create", issuesController.create);


//to delete a project
router.delete("/destroy/:id", issuesController.destroy);

//to create a project
router.get("/:id", issuesController.fetchAll);


//exporting router
module.exports =router;