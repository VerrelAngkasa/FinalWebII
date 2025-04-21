// Frontedn HTTP Request Service
import axios from 'axios';

// Get All SIM Data
export const signupAdmin = async () => {
    try {
        const response = await axios.post('/admin/signup');
        return response.data;
    } catch (err) {
        console.log('Error creating new admin:', err);
        throw err;
    }
};

// Get SIM Data by ID
export const loginAdmin = async () => {
    try {
        const response = await axios.post(`/admin/login`);
        return response.data;
    } catch (err) {
        console.log(`Error loggin admin: `, err)
    }
};

// Create New SIM Data
export const logoutAdmin = async () => {
    try {
        const response = await axios.post('/admin/logout');
        return response.data;
    } catch (err) {
        console.log('Error logging out admin:', err);
        throw err;
    }
};