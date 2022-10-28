import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3001/',
    withCredentials: true //pass session cookie to server
})

export default request;