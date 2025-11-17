const express = require('express');
const router = express.Router();


const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksForEmployee,
} = require('../controllers/task.controller');


router.route('/')
  .get(getAllTasks)   
  .post(createTask); 


router.route('/employee/:employeeId')
  .get(getTasksForEmployee); 


router.route('/:id')
  .get(getTaskById)    
  .put(updateTask)     
  .delete(deleteTask); 

module.exports = router;