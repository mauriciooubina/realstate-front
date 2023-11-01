import api from '../Api';

export default passwordRecoveryWS = {
    passwordRecover: async function (email) {
        return await api.post('/real-state/password-recovery', {
            email,
        });
    },
    passwordChange: async function (id, password) {
        return await api.put(`/real-states/${id}/password-change/${password}`);
    }
}