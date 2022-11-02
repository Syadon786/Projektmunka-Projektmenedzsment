import axios from 'axios';

const request = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND}/`,
    withCredentials: true //pass session cookie to server
})

export default request;