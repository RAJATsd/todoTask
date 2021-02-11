const msg = "INTERNAL SERVER ERROR";
const taskModel = require("../models/task");
const subTaskModel = require("../models/subTasks");

exports.addPost = async (req, res, next) => {
  try {
    const { title, subTasks, admin } = req.body;
    if (!admin) {
      return res.json({
        success: false,
        msg: "You should be a admin to do this task",
      });
    }
    const newTaskModel = new taskModel({
      title,
    });
    const savedModel = await newTaskModel.save();
    const newSubtasks = subTasks.map((task) => ({
      ...task,
      taskId: savedModel._id,
    }));
    const savedSubTasks = await subTaskModel.insertMany(newSubtasks);
    res.json({
      success: true,
      msg: { savedModel, savedSubTasks },
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      msg,
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId, admin } = req.params;
    console.log(admin);
    if (admin != 1) {
      return res.json({
        success: false,
        msg: "You should be a admin to do this task",
      });
    }
    await taskModel.findByIdAndDelete({ _id: taskId });
    await subTaskModel.deleteMany({ taskId });
    res.json({
      success: true,
      msg: "Task deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      msg,
    });
  }
};

exports.updateSubTask = async (req, res, next) => {
  try {
    const { subTaskId, changes, admin } = req.body;
    if (!admin) {
      return res.json({
        success: false,
        msg: "You should be a admin to do this task",
      });
    }
    await subTaskModel.findByIdAndUpdate({ _id: subTaskId }, changes);
    const updatedSubtask = await subTaskModel.findById({ _id: subTaskId });
    res.json({
      success: true,
      msg: updatedSubtask,
    });
    if ("status" in changes) {
      const allSubTasks = await subTaskModel.find({
        taskId: updatedSubtask.taskId,
      });
      if (allSubTasks.every((subT) => subT.status === "completed")) {
        await taskModel.findByIdAndUpdate(
          { _id: updatedSubtask.taskId },
          { status: "completed" }
        );
      }
    }
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      msg,
    });
  }
};

exports.deleteSubTask = async (req, res, next) => {
  try {
    const { subTaskId, admin } = req.params;
    if (admin != 1) {
      return res.json({
        success: false,
        msg: "You should be a admin to do this task",
      });
    }
    await subTaskModel.findByIdAndDelete({ _id: subTaskId });
    res.json({
      success: true,
      msg: "Subtask deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      msg,
    });
  }
};

exports.getSingleTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const singleTask = await taskModel.findById({ _id: taskId });
    const subTasks = await subTaskModel.find({ taskId });
    res.json({
      success: true,
      msg: {
        task: singleTask,
        subTasks,
      },
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      msg,
    });
  }
};
