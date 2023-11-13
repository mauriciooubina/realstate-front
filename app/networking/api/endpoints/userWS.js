import api from '../Api';

export default userWS = {
    get: async function (id) {
        return await api.get(`/user/${id}`);
    },
    put: async function (data) {
        const { id, name, email} = data;
        return await api.put('/user', {
            id, 
            name, 
            email,
        });
    },
    delete: async function (id) {
        return await api.delete(`/user/${id}`);
    }
}