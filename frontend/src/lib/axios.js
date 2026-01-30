import axios from 'axios';

// tao url goc cho moi lan goi api
const api = axios.create({ baseURL: "http://localhost:5001/api" });

export default api;