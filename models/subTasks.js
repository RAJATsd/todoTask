const mongoose = require('mongoose');

const schema = mongoose.Schema;

const subTaskSchema = new schema({
    taskId : {
        type:schema.Types.ObjectId,
        required:true,
        ref:"task"
    },
    taskDesc : {
        type:String,
        required:true
    },
    status : {
        type:String,
        default:"active"
    }
});

module.exports = mongoose.model('subtask',subTaskSchema);