//importing express
const express=require('express');
const router=express.Router();

//importing projects controller

const projectsController=require('../controllers/projects_controller');

router.post("/create",projectsController.create);

//router to redirect to the issues page
router.get("/issues/:id",projectsController.issues);

//router to delete a project
router.delete("/destroy/:id",projectsController.destroy);

//router to update a project
router.post("/update/:id",projectsController.update);

//exporting router
module.exports=router;