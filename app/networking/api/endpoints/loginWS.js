import api from '../Api';
import axios from 'axios';

// Configura un interceptor de solicitud para ver la URL completa y el cuerpo antes de enviarla
axios.interceptors.request.use(function (config) {
    console.log('URL de la solicitud:', config.url);
    console.log('Método de la solicitud:', config.method);
    console.log('Cuerpo de la solicitud:', config.data);
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default loginWS = {
    login: async function (email, password, googleToken) {
        const response = api.post('/login', {
            email,
            password,
            googleToken,
        });
        console.log('Solicitud de inicio de sesión:', response.config);
        console.log('Cuerpo de la solicitud de inicio de sesión:', (await response).config.data);
        console.log('Respuesta de inicio de sesión:', (await response).data);
        return response;
    },
    logout: async function () {
        return await api.post('logout');
    }
}
