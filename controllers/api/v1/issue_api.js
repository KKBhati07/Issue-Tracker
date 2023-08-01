// importing models
const Project = require("../../../models/project");
const Issue = require("../../../models/issue");

module.exports.fetchAll = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("issues");
        // if found,
        if (project) {
            return res.status(200).json({
                data: project.issues,
                message: "Issues fetched successfully"
            });
        }
        // if not
        return res.status(404).json({
            message: "Issues not found"
        });
        //if something else goes wrong
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}

//to fetch one issue from DB
module.exports.fetchOne = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        if (issue) {
            return res.status(200).json({
                data: issue,
                message: "Issue fetched successfully"
            });
        }
        return res.status(404).json({
            message: "Issue not found"
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

//to create an issue
module.exports.create = async (req, res) => {
    try {
        const issue = await Issue.create(req.body);
        //if issue is saved successfully
        if (issue) {
            const project = await Project.findById(issue.project);
            // if found, pushing the id of the issue in issues array of project model
            if (project) {
                project.issues.push(issue);
                project.save();
            }
            return res.status(200).json({
                data: issue,
                message: "Issue created successfully"
            });
            //if unable to save issue
        }
        return res.status(404).json({
            message: "Unable to create issue"
        });
        //if error
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

// to delete a issue from the database
module.exports.destroy = async (req, res) => {
    try {
        const issue = await Issue.findByIdAndDelete(req.params.id);
        if (issue) {
            const project = await Project.findById(issue.project);
            // if found, removing the issue id from the project
            if (project) {
                let index = project.issues.indexOf(req.params.id);
                project.issues.splice(index, 1);
                await project.save();
            }
            return res.status(200).json({
                data: issue,
                message: "Issue deleted successfully"
            });
        }
        return res.status(404).json({
            message: "Issue not found"
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


//to update an issue
module.exports.update = async (req, res) => {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await updatedIssue.save();
        //if updated successfully,
        if (updatedIssue) {
            return res.status(200).json({
                data: updatedIssue,
                message: "Issue updated successfully"
            });
            // if not
        }
        return res.status(404).json({
            message: "Issue not found"
        });

        // if something else goes wrong
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}