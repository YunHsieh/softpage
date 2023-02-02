import axios from 'axios'

const BASE_URL = process.env.HOST || "http://localhost:8000"
export const essayReq = axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ASDFA`,
    },
    params: {},
    timeout: 1000,
});
