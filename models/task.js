const mongoose = require('mongoose');

const schema = mongoose.Schema;

const taskSchema = new schema({
    title : {
        type:String,
        required:true
    },
    created_at : {
        type:Date,
        default:new Date()
    },
    status : {
        type:String,
        default:"active"
    }
});

module.exports = mongoose.model('task',taskSchema);