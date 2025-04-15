// Frontedn HTTP Request Service
import axios from 'axios';

// Get All STNK Data
export const getAllSTNK = async () => {
    try {
        const response = await axios.get('/data/stnk');
        return response.data;
    } catch (err) {
        console.log('Error fetching STNK data:', err);
        throw err;
    }
};

// Get STNK Data by ID
export const getSTNKById = async (id, data) => {
    try {
        const response = await axios.get(`/data/stnk/id?${id}`, data);
        return response.data;
    } catch (err) {
        console.log(`Error getting STNK ${id} data: `, err)
    }
};

// Create New STNK Data
export const createSTNK = async (data) => {
    try {
        const response = await axios.post('/data/stnk', data);
        return response.data;
    } catch (err) {
        console.log('Error creating new STNK data:', err);
        throw err;
    }
};

// Update Existing STNK Data
export const updateSTNKById = async (id, data) => {
    try {
        const response = await axios.put(`/data/stnk/id?${id}`, data);
        return response.data;
    } catch (err) {
        console.log(`Error updating STNK ${id} data: `, err);
        throw err;
    }
};

// Delete STNK Data
export const deleteSTNKById = async (id) => {
    try {
        await axios.delete(`/data/stnk/id?${id}`);
    } catch (err) {
        console.log(`Error deleting STNK ${id} data: `, err);
        throw err;
    }
};  