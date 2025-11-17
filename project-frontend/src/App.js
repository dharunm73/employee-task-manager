import React, { useState, useEffect } from 'react';


import './App.css';


import * as api from './services/apiService';


import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import TaskList from './components/TaskList';
import AddEmployeeModal from './components/AddEmployeeModal';
import AddTaskModal from './components/AddTaskModal';


function App() {
  
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  
  useEffect(() => {
    
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        const [fetchedEmployees, fetchedTasks] = await Promise.all([
          api.getEmployees(),
          api.getTasks()
        ]);
        
        setEmployees(fetchedEmployees);
        setTasks(fetchedTasks);

      } catch (err) {
        
        console.error("Failed to load data:", err);
        setError("Could not fetch data from the server. Please ensure the backend is running and try again.");
      } finally {
        setLoading(false);
      }
    };
    
    loadData(); 
  }, []); 

  
  
  
  const handleAddEmployee = async (newEmployee) => {
    
    try {
      const createdEmployee = await api.createEmployee(newEmployee);
      
      
      setEmployees([...employees, createdEmployee]);
      
    } catch (err) {
      
      console.error("Failed to add employee:", err);
      throw err; 
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    
    if (window.confirm("Are you sure you want to delete this employee? This may also affect their assigned tasks.")) {
      try {
        await api.deleteEmployee(employeeId);
        
        
        setEmployees(employees.filter(emp => emp._id !== employeeId));
        
        
        const fetchedTasks = await api.getTasks();
        setTasks(fetchedTasks);
        
      } catch (err) {
        console.error("Failed to delete employee:", err);
        alert("Error: Could not delete employee.");
      }
    }
  };
  
  
  
  const handleAddTask = async (newTask) => {
    
    try {
      const createdTask = await api.createTask(newTask);
      
      
      const fetchedTasks = await api.getTasks();
      setTasks(fetchedTasks);

    } catch (err) {
      console.error("Failed to add task:", err);
      throw err; 
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.deleteTask(taskId);
        
        
        setTasks(tasks.filter(task => task._id !== taskId));
        
      } catch (err) {
        console.error("Failed to delete task:", err);
        alert("Error: Could not delete task.");
      }
    }
  };
  
  
  if (loading) {
    return <div className="loading-message">Loading data...</div>;
  }
  
  
  if (error) {
    return <div className="error-message-full">{error}</div>;
  }

  
  return (
    <div className="App">
      
      {}
      <Header 
        onAddEmployee={() => setShowAddEmployeeModal(true)}
        onAddTask={() => setShowAddTaskModal(true)}
      />
      
      {}
      <main className="main-content">
        <EmployeeList 
          employees={employees}
          onEdit={() => {}} 
          onDelete={handleDeleteEmployee}
        />
        <TaskList 
          tasks={tasks}
          onEdit={() => {}}
          onDelete={handleDeleteTask}
        />
      </main>

      {}
      <AddEmployeeModal 
        show={showAddEmployeeModal}
        onClose={() => setShowAddEmployeeModal(false)}
        onAdd={handleAddEmployee}
      />
      
      <AddTaskModal 
        show={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onAdd={handleAddTask}
        employees={employees} 
      />

    </div>
  );
}

export default App;