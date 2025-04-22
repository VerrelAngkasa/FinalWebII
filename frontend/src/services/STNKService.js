import axios from 'axios';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get All STNK Data
export const getAllSTNK = async () => {
  try {
    const response = await axios.get('/data/stnk', getAuthHeaders());
    return response.data;
  } catch (err) {
    console.error('Error fetching STNK data:', err);
    throw err;
  }
};

// Get STNK Data by ID
export const getSTNKById = async (id) => {
  try {
    const response = await axios.get(`/data/stnk/id?${id}`, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.error(`Error getting STNK ${id} data:`, err);
    throw err;
  }
};

// Create New STNK Data
export const createSTNK = async (data) => {
  try {
    const response = await axios.post('/data/stnk', data, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.error('Error creating new STNK data:', err);
    throw err;
  }
};

// Update Existing STNK Data
export const updateSTNKById = async (id, data) => {
  try {
    const response = await axios.put(`/data/stnk/id?${id}`, data, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.error(`Error updating STNK ${id} data:`, err);
    throw err;
  }
};

// Delete STNK Data
export const deleteSTNKById = async (id) => {
  try {
    await axios.delete(`/data/stnk/id?${id}`, getAuthHeaders());
  } catch (err) {
    console.error(`Error deleting STNK ${id} data:`, err);
    throw err;
  }
};
