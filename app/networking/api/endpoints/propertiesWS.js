import api from '../Api';

export default propertiesWS = {
    getAll: async function () {
        return await api.get('/properties',);
    },
    getFromRealstate: async function (id) {
        return await api.get(`/properties/real-states/${id}`);
    },
    get: async function (id) {
        return await api.get(`/properties/${id}`);
    },
    put: async function (data) {
        const { id,} = data;
        return await api.put('/properties', {
            id,
        });
    },
    delete: async function (id) {
        return await api.delete(`/properties/${id}`);
    }
}