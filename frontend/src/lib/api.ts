import axios from 'axios';
import { env } from '../config/env';

// Create Axios instance
const api = axios.create({
    baseURL: env.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401s
// Response Interceptor: Optional global error logging
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // We let AuthContext handle 401s to keep state in sync
        return Promise.reject(error);
    }
);

export default api;
