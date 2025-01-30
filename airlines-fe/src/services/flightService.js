import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/flights";

const flightService = {
    getAllFlights: async () => {
        try {
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            return response.data;
        } catch (error) {
            console.error("Uçuşları alırken hata oluştu:", error);
            throw error;
        }
    },

    getFlightsByCity: async () => {
        try {
            const response = await axios.get(`${API_URL}/findByCity`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            return response.data;
        } catch (error) {
            console.error("Şehre göre uçuşları alırken hata oluştu:", error);
            throw error;
        }
    },

    searchFlights: async (departureCity, arrivalCity, departureDate) => {
        try {
            const response = await axios.get(`${API_URL}/search`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                params: { departureCity, arrivalCity, departureDate },
            });
            return response.data;
        } catch (error) {
            console.error("Uçuş arama sırasında hata oluştu:", error);
            throw error;
        }
    },

    addFlight: async (flightData) => {
        try {
            const response = await axios.post(API_URL, flightData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Uçuş eklerken hata oluştu:", error);
            throw error;
        }
    },

    deleteFlight: async (flightId) => {
        try {
            await axios.delete(`${API_URL}/${flightId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
        } catch (error) {
            console.error("Uçuş silme sırasında hata oluştu:", error);
            throw error;
        }
    },
};

export default flightService;