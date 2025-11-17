import React from 'react';
import './TaskList.css'; 
function TaskList({ tasks, onEdit, onDelete }) {
  
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-container">
        <h3>Task List</h3>
        <p className="empty-message">No tasks found. Add a task to get started!</p>
      </div>
    );
  }

  
  const formatClassName = (text) => {
    return text.replace(/\s+/g, '-');
  };

 
  const formatDate = (dateString) => {
    if (!dateString) {
      return 'N/A';
    }
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="task-list-container">
      <h3>Task List</h3>
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              
              {}
              <td>
                {task.assignedTo
                  ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
                  : <span className="unassigned">Unassigned</span>
                }
              </td>
              
              {}
              <td>
                <span className={`badge status-${formatClassName(task.status)}`}>
                  {task.status}
                </span>
              </td>
              
              {}
              <td>
                <span className={`badge priority-${formatClassName(task.priority)}`}>
                  {task.priority}
                </span>
              </td>
              
              <td>{formatDate(task.deadline)}</td>
              
              <td className="actions-cell">
                <button 
                  onClick={() => onEdit(task)} 
                  className="action-button edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(task._id)} 
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

export default TaskList;