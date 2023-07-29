//importing mongoose
const mongoose=require('mongoose');


// creating a Schema for projects
const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    author:{
        type:String,
        required:true
    },

    //storing the ids of the issues related to the project
    issues:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Issue'
    }]
}, {timestamps:true});


//creating a model and exporting it
module.exports=mongoose.model('Project',projectSchema);