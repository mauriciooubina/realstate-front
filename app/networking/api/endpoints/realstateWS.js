import api from '../Api';

export default realstateWS = {
    getAll: async function () {
        return await api.get('/real-state');
    },
    get: async function (id) {
        return await api.get(`/real-state/${id}`);
    },
    getComment: async function (id) {
        return await api.get(`/realstate/${id}/comments`);
    },
    postComment: async function (id, text, idUser, calificacion) {
        return await api.post(`/realstate/${id}/comments`, {
            text,
            idUser,
            calificacion,
        });
    },
    put: async function (data) {
        const { id, fantasyName, realStateEmail, comments, qualification } = data;
        return await api.put('/real-state', {
            id, 
            fantasyName, 
            emailRealState: realStateEmail, 
            comments, 
            qualification,
        });
    },
    delete: async function (id) {
        return await api.delete(`/real-state/${id}`);
    }
}