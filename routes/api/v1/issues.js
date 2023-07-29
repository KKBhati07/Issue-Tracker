const express=require('express');
const router=express.Router();

const issuesController=require("../../../controllers/api/v1/issue_api");

// api route to fetch all the issues
router.get("/:id",issuesController.fetchAll);

// api router to fetch one issue
router.get("/:id",issuesController.fetchOne);

// api router to create an issue
router.post("/create",issuesController.create);

// api router to delete an issue
router.delete("/destroy/:id",issuesController.destroy);

// api router to update an issue
router.put("/update/:id",issuesController.update);


//exporting router
module.exports = router; 