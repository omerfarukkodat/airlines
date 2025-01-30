import axios from "axios";


const API_URL = "http://localhost:8080/api/v1/auth";


const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    }catch (error) {
        throw error.response?.data || "Registration Error";
    }
};

const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        localStorage.setItem('token', response.data.token);
        return response.data.role;
    }catch (error) {
        throw error.response?.data || "Login Error";
    }
};

const checkAdmin = async () => {
    try {
        await axios.get(`${API_URL}/admin/check`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return true;
    }catch (error) {
        return false;
    }
}

const checkUser = async () => {
    try {
        await axios.get(`${API_URL}/user/check`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return true;
    } catch (error) {
        return false;
    }
}


const authService = {

    register,
    login,
    checkAdmin,
    checkUser
}

export default authService;







