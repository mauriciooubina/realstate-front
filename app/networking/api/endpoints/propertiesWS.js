import api from '../Api';

export default propertiesWS = {
    getAll: async function () {
        return await api.get('/real-state',);
    },
    get: async function (id) {
        return await api.get(`/real-state/${id}`);
    },
    put: async function (id, fantasyName, emailRealState, comments, qualification) {
        return await api.put('/real-state', {
            id, 
            fantasyName, 
            emailRealState, 
            comments, 
            qualification,
        });
    },
    delete: async function (id) {
        return await api.delete(`/real-state/${id}`);
    }
}