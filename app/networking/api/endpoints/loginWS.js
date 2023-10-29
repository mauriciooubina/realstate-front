import api from '../Api';

export default loginWS = {
    login: async function (email, password, googleToken) {
        return await api.post('/login', {
            email,
            password,
            googleToken,
        });
    },
    logout: async function () {
        return await api.post('logout');
    }
}