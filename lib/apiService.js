export const API_BASE_URL = "http://localhost:3000/api/";

import axios from "axios";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const getToken = () => {
  try {
    const persistAuth = localStorage.getItem("persist:auth");
    if (!persistAuth) return null;

    const parsedAuth = JSON.parse(persistAuth);
    const user = JSON.parse(parsedAuth.user);
    return user?.token || null;
  } catch (error) {
    console.error("Token parsing error:", error);
    return null;
  }
};

// Request interceptor to add Authorization header
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  console.log("token fetched", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get data from the API
export const fetchData = async (endpoint, data, config = {}) => {
  console.log(endpoint);
  try {
    if (!data) {
      const response = await apiClient.get(endpoint, config);
      return response.data;
    } else {
      const response = await apiClient.get(endpoint, data, config);
      return response.data;
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Post data to the API
export const postData = async (endpoint, data) => {
  try {
    if (data) {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } else {
      const response = await apiClient.post(endpoint);
      return response.data;
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
