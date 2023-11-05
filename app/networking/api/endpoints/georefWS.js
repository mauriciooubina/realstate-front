import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'https://apis.datos.gob.ar/georef/api',
  });

export default georefWS = {
    getProvincias: async function () {
        const response = await customAxios.get('/provincias');
        return response.data;
    },
    getLocalidades: async function () {
        const response =  await customAxios.get(`/departamentos?max=5000`);
        return response.data;
    },
    getBarrios: async function () {
        const response =  await customAxios.get(`/localidades?max=5000`);
        return response.data;
    }
}