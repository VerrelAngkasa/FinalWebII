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

// Get All SIM Data
export const getAllSIM = async () => {
    setAuthHeader(); // Set Authorization header
    try {
        const response = await axios.get('/data/sim');
        return response.data;
    } catch (err) {
        console.log('Error fetching SIM data:', err);
        throw err;
    }
};

// Get SIM Data by ID
export const getSIMById = async (id) => {
    setAuthHeader(); // Set Authorization header
    try {
        const response = await axios.get(`/data/sim/id?${id}`);
        return response.data;
    } catch (err) {
        console.log(`Error getting SIM ${id} data: `, err);
        throw err;
    }
};

// Create New SIM Data
export const createSIM = async (data) => {
    setAuthHeader(); // Set Authorization header
    try {
        const response = await axios.post('/data/sim', data);
        return response.data;
    } catch (err) {
        console.log('Error creating new SIM data:', err);
        throw err;
    }
};

// Update Existing SIM Data
export const updateSIMById = async (id, data) => {
    setAuthHeader(); // Set Authorization header
    try {
        const response = await axios.put(`/data/sim/id?${id}`, data);
        return response.data;
    } catch (err) {
        console.log(`Error updating SIM ${id} data: `, err);
        throw err;
    }
};

// Delete SIM Data
export const deleteSIMById = async (id) => {
    setAuthHeader(); // Set Authorization header
    try {
        await axios.delete(`/data/sim/id?${id}`);
    } catch (err) {
        console.log(`Error deleting SIM ${id} data: `, err);
        throw err;
    }
};
