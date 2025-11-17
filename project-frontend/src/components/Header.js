import React from 'react';
import './Header.css'; 
function Header({ onAddEmployee, onAddTask }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="header-title">
          Employee & Task Manager
        </h1>
        <div className="header-actions">
          <button 
            className="header-button" 
            onClick={onAddEmployee} 
          >
            Add Employee
          </button>
          <button 
            className="header-button" 
            onClick={onAddTask} 
          >
            Add Task
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;