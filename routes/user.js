const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post("/addTask",userController.addPost);
router.post("/update/subTask",userController.updateSubTask);

router.get("/get/task/:taskId",userController.getSingleTask);
router.get("/deleteTask/:taskId/:admin",userController.deleteTask);
router.get("/deleteSubTask/:subTaskId/:admin",userController.deleteSubTask);

module.exports = router;