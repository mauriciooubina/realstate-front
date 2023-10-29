import axios from 'axios';
import config from '../../config/config';

axios.defaults.baseURL = config.BASE_URL; 
axios.defaults.timeout = config.TIME_OUT;
axios.defaults.headers.common = {
    Accept: 'application/json' , 
    'Content-Type': 'application/json',
};

function setClientToken(token) {
    axios.defaults.headers.common = {Authorization: 'Bearer ' + {token}};
}

export default axios ;