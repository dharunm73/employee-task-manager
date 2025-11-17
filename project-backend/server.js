
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');


const employeeRoutes = require('./routes/employee.routes');
const taskRoutes = require('./routes/task.routes');


connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/employees', employeeRoutes);


app.use('/api/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.send('Task Manager API is up and running!');
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});