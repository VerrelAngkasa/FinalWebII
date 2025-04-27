import axios from 'axios';

// Helper function to get the JWT token from localStorage (or sessionStorage)
const getAuthToken = () => {
  return localStorage.getItem('jwtToken'); // Assuming the token is stored in localStorage
};

// Set the Authorization header with JWT token
const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
      delete axios.defaults.headers.common['Authorization'];
  }
};

// Get All STNK Data
export const getAllSTNK = async () => {
  setAuthHeader(); // Set Authorization header
  try {
    const response = await axios.get('/data/stnk');
    return response.data;
  } catch (err) {
    console.error('Error fetching STNK data:', err);
    throw err;
  }
};

// Get STNK Data by ID
export const getSTNKById = async (id) => {
  setAuthHeader(); // Set Authorization header
  try {
    const response = await axios.get(`/data/stnk/id?${id}`);
    return response.data;
  } catch (err) {
    console.error(`Error getting STNK ${id} data:`, err);
    throw err;
  }
};

// Create New STNK Data
export const createSTNK = async (data) => {
  setAuthHeader(); // Set Authorization header
  try {
    const response = await axios.post('/data/stnk', data);
    return response.data;
  } catch (err) {
    console.error('Error creating new STNK data:', err);
    throw err;
  }
};

// Update Existing STNK Data
export const updateSTNKById = async (id, data) => {
  setAuthHeader(); // Set Authorization header
  try {
    const response = await axios.put(`/data/stnk/id?${id}`, data);
    return response.data;
  } catch (err) {
    console.error(`Error updating STNK ${id} data:`, err);
    throw err;
  }
};

// Delete STNK Data
export const deleteSTNKById = async (id) => {
  setAuthHeader(); // Set Authorization header
  try {
    await axios.delete(`/data/stnk/id?${id}`);
  } catch (err) {
    console.error(`Error deleting STNK ${id} data:`, err);
    throw err;
  }
};
