// importing Project model
const Project = require("../models/project");

// importing issue model
const Issue = require("../models/issue");


// to fetch all the issues for a project
module.exports.fetchAll = async (req, res) => {
    try {
        const project = await Project.find(req.params.id).populate("issues");
        //if fetched successfully

        //if the request is a AJAX request
        if (req.xhr) {
            if (project) {
                return res.status(200).json({
                    data: project.issues,
                    message: "All issues fetched successfully"
                });
                // if not
            } else {
                return res.status(404).json({
                    message: "Unable to fetch Issues"
                });
            }

        }
        //if something else goes wrong
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}



//to create new issue in the database, and relate it ti the project
module.exports.create = async (req, res) => {
    try {

        //if the request is a AJAX request
        if (req.xhr) {
            const issue = await Issue.create(req.body);
            if (issue) {
                const project = await Project.findById(issue.project);
                // pushing the id of the issue in issues array of project model
                project.issues.push(issue);
                await project.save();
                return res.status(200).json({
                    data: issue,
                    message: "Issue created successfully"
                });

            }
            return res.status(400).json({
                message:"Unable to create issue"
            });

        }
        // for normal requests, returning to the project page
        // although, i am using ajax or the Api to create issues, still to be on safer side providing this
        return res.redirect("back");


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to create issue"
        });
    }


}


//to delete a issue from the database
module.exports.destroy = async (req, res) => {
    try {
        const issue = await Issue.findByIdAndDelete(req.params.id);
        //if the request is a AJAX request
        if (req.xhr) {
            if (issue) {
                // finding the project of the issue
                const project = await Project.findById(issue.project);
                // if found, removing the issue id from the project
                if (project) {
                    let index = project.issues.indexOf(req.params.id);
                    project.issues.splice(index, 1);
                    await project.save();

                }
                return res.status(200).json({
                    id: issue.id,
                    message: "issue deleted successfully"
                })
            } else return res.status(500).json({ message: "unable to delete issue" })
        }
        return res.redirect("back")
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}