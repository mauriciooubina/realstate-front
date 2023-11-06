import api from '../Api';

export default propertiesWS = {
    post: async function (data) {
        return await api.post('/properties', {
            ...data
        });
    },
    postMedia: async function (media) {
        return await api.post('/properties/loadMultimedia', {
            ...media
        });
    },
    getCalles: async function (calle) {
        return await api.get(`/properties/calles/${calle}`);
    },
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
        return await api.put('/properties', {
            ...data
        });
    },
    delete: async function (id) {
        return await api.delete(`/properties/${id}`);
    }
}