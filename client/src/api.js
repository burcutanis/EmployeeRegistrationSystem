import axios from 'axios';
import store from './store';


// Create an instance of axios
const api = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json'
    }
});


api.interceptors.response.use(
    (res) => res,
    (err) => {
        return Promise.reject(err);
    }
);

export default api;