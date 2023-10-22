import axios from "axios";

// Create an Axios instance with a base URL
const adminInstance = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL:'https://prominentmuhzin.online'
});

// Add a request interceptor
adminInstance.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("adminToken");
    if (tokenString) {
      try {
        const token = JSON.parse(tokenString);

        config.headers.authorization = `Bearer ${token}`;
      } catch (error) {
        // Handle JSON parsing error, if any
        console.error("Error parsing token:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
adminInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.message === "jwt expired") {
      localStorage.removeItem("adminToken");
      window.location.replace("/admin/login");
    }
    return response;
  },
  (error) => {
    console.error(error);
    if (error?.response?.data?.message === "jwt expired") {
      localStorage.removeItem("tutortoken");
      window.location.replace("/admin_login");
    }
    return Promise.reject(error);
  }
);

export default adminInstance;
