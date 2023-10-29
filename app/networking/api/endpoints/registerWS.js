import api from '../Api';

export default registerWS = {
    register: async function (email, password, fantasyName, emailRealState) {
        return await api.post('/real-states', {
            email,
            password,
            fantasyName,
            emailRealState,
        });
    }
}