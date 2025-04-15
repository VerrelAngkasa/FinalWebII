// Frontedn HTTP Request Service
import axios from 'axios';

// Get All SIM Data
export const getAllSIM = async () => {
    try {
        const response = await axios.get('/data/sim');
        return response.data;
    } catch (err) {
        console.log('Error fetching SIM data:', err);
        throw err;
    }
};

export const getSIMById = async (id, data) => {
    try {
        const response = await axios.get(`/data/sim/id?${id}`, data);
        return response.data;
    } catch (err) {
        console.log(`Error getting SIM ${id} data: `, err)
    }
};

// Create New SIM Data
export const createSIM = async (data) => {
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
    try {
        await axios.delete(`/data/sim/id?${id}`);
    } catch (err) {
        console.log(`Error deleting SIM ${id} data: `, err);
        throw err;
    }
};  