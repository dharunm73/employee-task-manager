const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true, 
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, 
      lowercase: true, 
      trim: true,
      
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    position: {
      type: String,
      trim: true,
      default: 'N/A', 
    },
    department: {
      type: String,
      trim: true,
      default: 'N/A',
    },
  },
  {
    
    timestamps: true,
  }
);


module.exports = mongoose.model('Employee', employeeSchema);