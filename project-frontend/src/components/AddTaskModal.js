import React, { useState } from 'react';
import './Modal.css'; 
function AddTaskModal({ show, onClose, onAdd, employees }) {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');
  const [assignedTo, setAssignedTo] = useState(''); 

  const [error, setError] = useState('');

  
  const clearForm = () => {
    setTitle('');
    setDescription('');
    setStatus('Not Started');
    setPriority('Medium');
    setDeadline('');
    setAssignedTo('');
    setError('');
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!title) {
      setError('Task Title is required.');
      return;
    }

    
    const newTask = {
      title,
      description,
      status,
      priority,
      deadline: deadline || null, 
      assignedTo: assignedTo || null,
    };

    
    try {
      await onAdd(newTask);
      handleClose(); 
    } catch (apiError) {
      
      setError(apiError.message);
    }
  };

  
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Task</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="assignedTo">Assign To</label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              {}
              <option value="">Unassigned</option>
              
              {}
              {employees && employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.firstName} {emp.lastName} ({emp.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="button-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="button-confirm">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;