//importing express
const express=require('express');
const router=express.Router();

// importing project api controller
const projectController=require("../../../controllers/api/v1/project_api");


//router to create a project
router.post("/create",projectController.create);



//router to get all projects
router.get("/",projectController.fetchAll);


//router to get one project by its id
router.get("/:id",projectController.fetchOne);


//router to delete a project
router.delete("/destroy/:id",projectController.destroy);


//router to update a project
router.put("/update/:id",projectController.update);



//exporting router
module.exports = router;   