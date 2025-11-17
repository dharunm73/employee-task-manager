const API_BASE_URL = 'http://localhost:5001/api';


const handleResponse = async (response) => {
  
  const data = await response.json();

  
  if (!response.ok) {
    
    const errorMessage = data?.message || `Error: ${response.status}`;
    throw new Error(errorMessage);
  }

 
  return data;
};


export const getEmployees = async () => {
  const response = await fetch(`${API_BASE_URL}/employees`);
  return handleResponse(response);
};


export const createEmployee = async (employee) => {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  return handleResponse(response);
};


export const updateEmployee = async (id, employee) => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  return handleResponse(response);
};


export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};


export const getTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  return handleResponse(response);
};


export const createTask = async (task) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return handleResponse(response);
};


export const updateTask = async (id, task) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return handleResponse(response);
};


export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};