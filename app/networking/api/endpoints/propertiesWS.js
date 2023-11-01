import api from '../Api';

export default propertiesWS = {
    getAll: async function () {
        return await api.get('/properties',);
    },
    get: async function (id) {
        return await api.get(`/properties/${id}`);
    },
    put: async function (id, fantasyName, emailRealState, comments, qualification) {
        return await api.put('/properties', {
            id, 
            fantasyName, 
            emailRealState, 
            comments, 
            qualification,
        });
    },
    delete: async function (id) {
        return await api.delete(`/properties/${id}`);
    }
}