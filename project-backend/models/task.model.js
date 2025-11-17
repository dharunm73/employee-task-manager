const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '', 
    },
    status: {
      type: String,
      
      enum: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
      default: 'Not Started',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    deadline: {
      type: Date,
      default: null, 
    },
    
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'Employee', 
      default: null, 
    },
  },
  {
    timestamps: true, 
  }
);


module.exports = mongoose.model('Task', taskSchema);