//importing Project model
const Project=require("../models/project");


//to render the homepage
module.exports.home=async(req,res)=>{
    const projects=await Project.find();
    
    return res.render("home.ejs",{
        title:"Issue Tracker | Home",
        numProjects:projects.length
    });
}

