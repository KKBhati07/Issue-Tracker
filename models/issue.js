const mongoose = require('mongoose');

//creating new issue to store issues
const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },

    labels: [
        {
            type: String,
            //to remove white spaces in start or end
            trim: true
        }
    ],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }


    //to store timestamps
}, { timestamps: true });

//exporting the model
module.exports = mongoose.model('Issue', issueSchema);