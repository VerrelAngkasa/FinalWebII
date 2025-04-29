import axios from 'axios';

const API_URL='https://sja-backend-629152958854.asia-southeast2.run.app';

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

// Create New STNK Data
export const createSTNK = async (data) => {
  setAuthHeader(); // Set Authorization header
  try {
    const response = await axios.post(`${API_URL}/data/stnk`, data);
    return response.data;
  } catch (err) {
    console.error('Error creating new STNK data:', err);
    throw err;
  }
};

// Get All STNK Data
export const getAllSTNK = async () => {
  setAuthHeader(); // Set Authorization header
  try {
    const response = await axios.get(`${API_URL}/data/stnk`);
    return response.data;
  } catch (err) {
    console.error('Error fetching STNK data:', err);
    throw err;
  }
};

// Get STNK Data by ID
export const getSTNKById = async (id) => {
  setAuthHeader();
  try {
    const response = await axios.get(`${API_URL}/data/stnk/${id}`); // Fix: Correct URL format
    return response.data;
  } catch (err) {
    console.error(`Error getting STNK ${id} data:`, err);
    throw err;
  }
};

// Update Existing STNK Data
export const updateSTNKById = async (id, data) => {
  setAuthHeader();
  try {
    const response = await axios.put(`${API_URL}/data/stnk/${id}`, data); // Fix: Correct URL format
    return response.data;
  } catch (err) {
    console.error(`Error updating STNK ${id} data:`, err);
    throw err;
  }
};

// Delete STNK Data
export const deleteSTNKById = async (id) => {
  setAuthHeader();
  try {
    const response = await axios.delete(`${API_URL}/data/stnk/${id}`); // Fix: Correct URL format
    return response.data; // Add: Return response data
  } catch (err) {
    console.error(`Error deleting STNK ${id} data:`, err);
    throw err;
  }
};