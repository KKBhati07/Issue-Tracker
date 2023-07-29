const Project = require("../models/project");


//to fetch all the projects in the database
module.exports.fetchAll = async (req, res) => {

    try {
        //if the request is a AJAX request
        if (req.xhr) {
            const projects = await Project.find();
            // if fetched successfully
            if (projects) {
                return res.status(200).json({
                    projects: projects,
                    message: "projects fetched successfully"
                });
                // if not
            } else return res.status(500).json({ message: "unable to find projects" });


        }
        //if not a ajax request, redirect back to the home page
        return res.redirect("back");
        //if something else goes wrong
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return res.redirect("back");
    }
}

//to create a new project in the database
module.exports.create = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        //if the request is a AJAX request
        if (req.xhr) {
            //if created successfully
            if (project) {
                return res.status(200).json({
                    project: project,
                    message: "project created successfully"
                });
                // if not
            }
            return res.status(500).json({ message: "unable to create project" });
        }
        //if not a ajax request, redirect back to the home page
        return res.redirect("back");
        //if something else goes wrong
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        //if not a ajax request, redirect back to the home page
        return res.redirect("back");
    }
}


// to delete a project from the database
module.exports.destroy = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (req.xhr) {
            // if deleted successfully
            if (project) {
                return res.status(200).json({
                    id: project.id,
                    message: "project deleted successfully"
                })
                // if not
            } 
            return res.status(500).json({ message: "unable to delete project" })
        }
        //if not a ajax request, redirect back to the home page
        return res.redirect("back")
        //if something else goes wrong
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }


}

//to update a project
module.exports.update = async (req, res) => {
    try {
        await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.redirect("back");


        //is anything goes wrong
    } catch (error) {
        console.log(error);
        return res.redirect("back");

    }

}




//to redirect yo the issues page with the project details
module.exports.issues = async (req, res) => {
    try {
        const projects = await Project.find();
        const project = await Project.findById(req.params.id);

        return res.render("issues", {
            title: "Issue Tracker | Project",
            project: project,
            numProjects: projects.length,
            numIssues: project.issues.length
        });

        //if something goes wrong
    } catch (error) {
        console.log(error);
        return res.send("<h1>Page Not Found</h1>");

    }
}

