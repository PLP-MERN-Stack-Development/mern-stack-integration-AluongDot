import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "https://mern-stack-integration-ngong2.onrender.com/api";

// PUBLIC API - No credentials for public routes
const publicAPI = axios.create({
  baseURL: API_BASE,
});

// PRIVATE API - With credentials for protected routes
const privateAPI = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Add auth token only to private API
privateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==========================
// 🔐 AUTH ENDPOINTS (PROTECTED)
// ==========================
export const register = (payload) =>
  privateAPI.post("/auth/register", payload).then((res) => res.data);

export const login = (payload) =>
  privateAPI.post("/auth/login", payload).then((res) => res.data);

export const logout = () =>
  privateAPI.post("/auth/logout").then((res) => res.data);

export const getMe = () =>
  privateAPI.get("/auth/me").then((res) => res.data);

export const forgotPassword = (email) =>
  privateAPI.post("/auth/forgot-password", { email }).then((res) => res.data);

export const resetPassword = (token, password) =>
  privateAPI.post(`/auth/reset-password/${token}`, { password }).then((res) => res.data);

// ==========================
// 📝 POSTS ENDPOINTS
// ==========================
export const getPosts = (page = 1, search = "", category = "") =>
  publicAPI
    .get(
      `/posts?page=${page}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(
        category
      )}`
    )
    .then((res) => res.data);

export const getPost = (id) => publicAPI.get(`/posts/${id}`).then((res) => res.data);

export const getCategories = () =>
  publicAPI.get("/categories").then((res) => res.data);

export const createPost = (formData) =>
  privateAPI.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((res) => res.data);

export const updatePost = (id, formData) =>
  privateAPI.put(`/posts/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((res) => res.data);

export const deletePost = (id) =>
  privateAPI.delete(`/posts/${id}`).then((res) => res.data);

export default privateAPI;