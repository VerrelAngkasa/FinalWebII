// Frontedn HTTP Request Service
import axios from 'axios';

// Get All STNK Data
export const getAllData = async () => {
    try {
        const response = await axios.get('/data');
        return response.data;
    } catch (err) {
        console.log('Error fetching STNK data:', err);
        throw err;
    }
};

// Create New STNK Data
export const createData = async (data) => {
    try {
        const response = await axios.post('/data', data);
        return response.data;
    } catch (err) {
        console.log('Error creating new STNK data:', err);
        throw err;
    }
};

// Update Existing STNK Data
export const updateData = async (id, data) => {
    try {
        const response = await axios.put(`/data/${id}`, data);
        return response.data;
    } catch (err) {
        console.log('Error updating STNK data:', err);
        throw err;
    }
};

// Delete STNK Data
export const deleteData = async (id) => {
    try {
        await axios.delete(`/data/${id}`);
    } catch (err) {
        console.log('Error deleting STNK data:', err);
        throw err;
    }
};  