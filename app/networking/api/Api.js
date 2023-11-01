import axios from 'axios';
import config from '../../config/config';

axios.defaults.baseURL = config.BASE_URL; 
axios.defaults.timeout = config.TIME_OUT;
axios.defaults.headers.common = {
    Accept: 'application/json' , 
    'Content-Type': 'application/json',
};

function setClientToken(token) {
    const existingHeaders = axios.defaults.headers.common;
    axios.defaults.headers.common = {
    ...existingHeaders,
    Authorization: `Bearer ${token}`
    }
}

function cleanClientToken() {
    axios.defaults.headers.common = {};
}

export {setClientToken, cleanClientToken};

export default axios ;