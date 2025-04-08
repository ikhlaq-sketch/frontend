import axios from 'axios';

// Create an instance of Axios with the base URL for your API
const API = axios.create({
    baseURL:  "https://nextstep-backend-production.up.railway.app/api", // Base backend URL
});
const API_BASE_URL = "https://nextstep-backend-production.up.railway.app/api";



// Add Authorization header automatically if access_token exists
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');  // <-- Changed 'token' to 'access_token'
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // For JWT tokens
    }
    return config;
});

// Function to send user registration data
export const sendUserData = (data) => API.post('/register/', data);

export default axios.create({
  baseURL:  "https://nextstep-backend-production.up.railway.app/api" ,// update if different
  headers: {
    "Content-Type": "application/json",
  },
});

export const googleAuth = (data) => API.post('/auth/google/', data);

// Function to send login credentials and get response
export const loginUser = (credentials) => API.post('/login/', credentials);

export const saveUserProfile = (profileData) =>
    API.post('/profile/', profileData);  // Matches save_profile view




// Function to fetch user profile data
export const fetchUserProfile = (username) => 
    API.get(`/fetch-profile/?username=${encodeURIComponent(username)}`);



// Function to verify user's email
export const verifyEmail = (token) => API.get(`/verify-email/?token=${encodeURIComponent(token)}`);


export const addNewSkill = async (skillData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add-skill/`, skillData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding skill:", error);
      return { error: "Failed to add skill" };
    }
  };
  
  export const retrainModel = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/retrain-model/`, {}, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error retraining model:", error);
      return { error: "Failed to retrain model" };
    }
  };
  
  // export default API