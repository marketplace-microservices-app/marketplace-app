export const API_BASE_URL = "http://localhost:3000/api/";

import { logout, login } from "../redux/authSlice";
import store from "../redux/store";

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

const getRefreshToken = () => {
  try {
    const persistAuth = localStorage.getItem("persist:auth");
    if (!persistAuth) return null;

    const parsedAuth = JSON.parse(persistAuth);
    const user = JSON.parse(parsedAuth.user);
    return user?.refreshToken || null;
  } catch (error) {
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

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("oR", originalRequest);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(`${API_BASE_URL}auth/refresh`, {
          refreshToken,
        });

        console.log("refresh token brought res", res);
        const newToken = res.data.accessToken;

        console.log("refresh token brought new accessToken", newToken);

        // Update the token in Redux sotre
        const state = store.getState();
        const user = { ...state.auth.user, token: newToken };
        store.dispatch(login(user));

        // Re-try the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        console.log("updated or", originalRequest);
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        store.dispatch(logout()); // log out user if refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

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
export const postData = async (endpoint, data, config = {}) => {
  try {
    if (data) {
      const response = await apiClient.post(endpoint, data, config);
      return response.data;
    } else {
      const response = await apiClient.post(endpoint, config);
      return response.data;
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
