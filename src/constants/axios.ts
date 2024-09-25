'use client';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: false
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  `Bearer ${token}`;
    return config;
});

export default instance;