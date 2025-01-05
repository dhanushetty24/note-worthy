import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://jotgles-api-prd.eba-jqkcigmm.ap-south-1.elasticbeanstalk.com/api', // Base URL
});

// Add a request interceptor to dynamically set the Authorization header if needed
axiosInstance.interceptors.request.use(
  (config) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJEaGFudXNoIFNoZXR0eSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNTg5MjE0Nn0.N05XfA9CvbpBD72aF8u74yi1j6rnm6bccfA7Pk21XEc';
    const userId = 'Dhanush Shetty';

    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
      config.headers['userId'] = userId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;