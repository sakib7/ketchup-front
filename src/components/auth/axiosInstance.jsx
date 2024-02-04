import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://raychromium.pythonanywhere.com/api',
});

const setAuthorizationHeader = (config) => {
  const token = localStorage.getItem('token');


  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

axiosInstance.interceptors.request.use(setAuthorizationHeader);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    const { status } = error.response;

    // Handle token expiration or other authentication errors
    if (status === 401) {
      // Redirect to login or handle the unauthorized state as needed
      console.error('Unauthorized request. Redirect to login or handle it.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
