import React from 'react';
import './EmployeeList.css'; 


function EmployeeList({ employees, onEdit, onDelete }) {
  
  if (!employees || employees.length === 0) {
    return (
      <div className="employee-list-container">
        <h3>Employee Roster</h3>
        <p className="empty-message">No employees found. Add an employee to get started!</p>
      </div>
    );
  }

  
  return (
    <div className="employee-list-container">
      <h3>Employee Roster</h3>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {}
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td className="actions-cell">
                {}
                <button 
                  onClick={() => onEdit(employee)} 
                  className="action-button edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(employee._id)} 
                  className="action-button delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;