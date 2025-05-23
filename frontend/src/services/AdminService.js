import axios from 'axios';

const API_URL='https://sja-backend-629152958854.asia-southeast2.run.app';

// Get All SIM Data
export const signupAdmin = async ({ name, email, password }) => {
    try {
        const response = await axios.post(`${API_URL}/admin/signup`, { name, email, password });
        return response.data;
    } catch (err) {
        console.log('Error creating new admin:', err);
        throw err;
    }
};

// Get SIM Data by ID
export const loginAdmin = async ({ email, password }) => {
    try {
        const response = await axios.post(`${API_URL}/admin/login`, { email, password });
        return response.data;
    } catch (err) {
        console.log(`Error loggin admin: `, err)
    }
};

// Create New SIM Data
export const logoutAdmin = async () => {
    try {
        await axios.post(`${API_URL}/admin/logout`);
    } catch (err) {
        console.log('Error logging out admin:', err);
        throw err;
    }
};