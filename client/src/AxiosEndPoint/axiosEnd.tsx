import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API base URL
});

// Export the Axios instance for use in other parts of your application
export default axiosInstance;
