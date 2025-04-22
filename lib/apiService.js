export const API_BASE_URL = "http://localhost:3000/api/";

import axios from "axios";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // headers: { "Content-Type": "application/json" },
  //withCredentials: true, // If using authentication with cookies
});

// Get data from the API
export const fetchData = async (endpoint, data) => {
  console.log(endpoint);
  try {
    if (!data) {
      const response = await apiClient.get(endpoint);
      return response.data;
    } else {
      const response = await apiClient.get(endpoint, data);
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
