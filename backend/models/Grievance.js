const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
    title:String,
    description:String,
    category:String,
    date:{type:Date, default:Date.now},
    status:{type:String, default:"Pending"},
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    }
});

module.exports = mongoose.model("Grievance", grievanceSchema);