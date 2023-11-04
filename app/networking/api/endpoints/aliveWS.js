import api from '../Api';

export default aliveWS = {
    alive: async function () {
        api.defaults.headers.common = {
            Accept: 'application/json' , 
            'Content-Type': 'application/json',
        };
        return await api.get('/alive');
    }
}