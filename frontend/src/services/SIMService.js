import axios from 'axios';

const getAuthToken = () => {
    return localStorage.getItem('jwtToken');
};

const setAuthHeader = () => {
    const token = getAuthToken();
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const getAllSIM = async () => {
    setAuthHeader();
    try {
        const response = await axios.get('/api/data/sim');
        return response.data;
    } catch (err) {
        console.error('Error fetching SIM data:', err);
        throw err;
    }
};

export const getSIMById = async (id) => {
    setAuthHeader();
    try {
        console.log('Getting SIM with ID:', id); // Debug log
        const response = await axios.get(`/api/data/sim/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting SIM ${id}:`, err);
        throw err;
    }
};

export const createSIM = async (data) => {
    setAuthHeader();
    try {
        const response = await axios.post('/api/data/sim', data);
        return response.data;
    } catch (err) {
        console.error('Error creating SIM:', err);
        throw err;
    }
};

export const updateSIMById = async (id, data) => {
    setAuthHeader();
    try {
        console.log('Updating SIM with ID:', id, 'Data:', data); // Debug log
        const response = await axios.put(`/api/data/sim/${id}`, data);
        return response.data;
    } catch (err) {
        console.error(`Error updating SIM ${id}:`, err);
        throw err;
    }
};

export const deleteSIMById = async (id) => {
    setAuthHeader();
    try {
        console.log('Deleting SIM with ID:', id); // Debug log
        const response = await axios.delete(`/api/data/sim/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error deleting SIM ${id}:`, err);
        throw err;
    }
};