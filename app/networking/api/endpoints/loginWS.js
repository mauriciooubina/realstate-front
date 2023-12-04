import api, { setClientToken, cleanClientToken } from "../Api";
import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    console.log("URL de la solicitud:", config.baseURL + config.url);
    console.log("Método de la solicitud:", config.method);
    console.log("Cuerpo de la solicitud:", config.data);
    console.log("Encabezados de la solicitud:", config.headers);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log("Respuesta:", response.data);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default loginWS = {
  login: async function (email, password, googleToken) {
    const response = api.post("/login", {
      email,
      password,
      googleToken,
    });
    console.log(
      "Cuerpo de la solicitud de inicio de sesión:",
      (await response).config.data
    );
    console.log("Respuesta de inicio de sesión:", (await response).data);
    setClientToken((await response).data.token);
    return response;
  },
  logout: async function () {
    const response = api.post("/logout");
    console.log(response.data);
    cleanClientToken();
    return response;
  },
};
