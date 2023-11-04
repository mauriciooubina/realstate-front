import api from '../Api';

export default aliveWS = {
    alive: async function () {
        return await api.get('/alive');
    }
}