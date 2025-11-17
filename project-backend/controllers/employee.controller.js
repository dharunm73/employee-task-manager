const Employee = require('../models/employee.model');

const createEmployee = async (req, res) => {
  try {
    
    const { firstName, lastName, email, position, department } = req.body;

    
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'First name, last name, and email are required.' });
    }

    
    const employeeExists = await Employee.findOne({ email });

    if (employeeExists) {
      return res.status(400).json({ message: 'An employee with this email already exists.' });
    }

    
    const employee = new Employee({
      firstName,
      lastName,
      email,
      position,
      department,
    });

    
    const createdEmployee = await employee.save();

    
    res.status(201).json(createdEmployee);
  } catch (error) {
    
    res.status(400).json({ message: 'Error creating employee', error: error.message });
  }
};


const getAllEmployees = async (req, res) => {
  try {
    
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};


const getEmployeeById = async (req, res) => {
  try {
    
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      res.status(200).json(employee);
    } else {
      
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
};


const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      
      employee.firstName = req.body.firstName || employee.firstName;
      employee.lastName = req.body.lastName || employee.lastName;
      employee.email = req.body.email || employee.email;
      employee.position = req.body.position || employee.position;
      employee.department = req.body.department || employee.department;

      
      const updatedEmployee = await employee.save();
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    
    res.status(400).json({ message: 'Error updating employee', error: error.message });
  }
};


const deleteEmployee = async (req, res) => {
  try {
    
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (employee) {
      
      res.status(200).json({ message: 'Employee removed successfully' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};


module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};