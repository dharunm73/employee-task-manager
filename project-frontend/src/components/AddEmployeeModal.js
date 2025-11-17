import React, { useState } from 'react';
import './Modal.css'; 


function AddEmployeeModal({ show, onClose, onAdd }) {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  
  const [error, setError] = useState('');

  
  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPosition('');
    setDepartment('');
    setError('');
  };

  
  const handleClose = () => {
    clearForm(); 
    onClose();   
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    
    if (!firstName || !lastName || !email) {
      setError('First Name, Last Name, and Email are required.');
      return; 
    }

    
    const newEmployee = { firstName, lastName, email, position, department };

    
    try {
      
      await onAdd(newEmployee);
      
      
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
        {}
        
        <h2>Add New Employee</h2>
        
        {}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="button-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="button-confirm">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeModal;