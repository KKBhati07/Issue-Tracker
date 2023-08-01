// importing projects model
const Project = require("../../../models/project");

//to add a project into the database
module.exports.create = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        // if project created successfully
        if (project) {
            return res.status(200).json({
                data: project,
                message: "Project created successfully"
            });
            // if not
        }
        return res.status(500).json({
            message: "Error creating a project"
        });

        // if something else goes wrong
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }


}

// to fetch all the projects from the database
module.exports.fetchAll = async (req, res) => {
    try {

        const projects = await Project.find({});
        //if fetched successfully
        if (projects) {

            return res.status(200).json({
                data: projects,
                message: "Projects fetched successfully"
            });
            // if not
        }
        return res.status(500).json({
            message: "Error fetching projects"
        });
        // if something else goes wrong
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports.fetchOne = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        // if fetched successfully
        if (project) {
            return res.status(200).json({
                data: project,
                message: "Project fetched successfully"
            });
            // if not
        }
        return res.status(500).json({
            message: "Project not found"
        });

        // if something else goes wrong
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


// to delete a project by its ID
module.exports.destroy = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        // if deleted successfully
        if (deletedProject) {
            return res.status(200).json({
                data: deletedProject,
                message: "Project deleted successfully"
            });
            // if not
        }
        return res.status(500).json({
            message: "Error deleting project"
        });


        // if something else goes wrong
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }


}

//to update a project
module.exports.update = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // if updated successfully
        if (updatedProject) {
            return res.status(200).json({
                data: updatedProject,
                message: "Project updated successfully"
            });
            // if not
        }
        return res.status(500).json({
            message: "Error updating project"
        });


        // if something else goes wrong
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

