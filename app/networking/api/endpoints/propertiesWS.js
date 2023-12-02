import api, { getClientToken } from "../Api";

export default propertiesWS = {
  post: async function (data) {
    return await api.post("/properties", {
      ...data,
    });
  },
  postMedia: async function (media, propertyId) {
    const token = getClientToken();
    const myHeaders = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `${token}`,
    };
    const formData = new FormData();
    const json = {
      idProperty: propertyId,
    };
    formData.append("propertyInDTO", JSON.stringify(json));
    media.forEach((valor) => {
      const pos1 = valor.lastIndexOf("/");
      const pos2 = valor.lastIndexOf(".");
      console.log("uri: ", valor);
      console.log("name: ", valor.substring(pos1 + 1));
      console.log("type: ", `image/${valor.substring(pos2 + 1)}`);
      formData.append("photos", {
        uri: valor,
        name: valor.substring(pos1 + 1),
        type: `image/${valor.substring(pos2 + 1)}`,
      });
    });
    try {
      const res = await api.post(
        "/properties/loadMultimedia",
        formData,
        {
          headers: myHeaders,
        }
      );      
      console.log('response: ', res);
    } catch (error) {
      console.log('error: ',error);
    }
  },
  search: async function (data) {
    return await api.post("/properties/propertyBy", {
      ...data,
    });
  },
  getCalles: async function (calle) {
    return await api.get(`/properties/calles/${calle}`);
  },
  getAll: async function () {
    return await api.get("/properties");
  },
  getFromRealstate: async function (id) {
    return await api.get(`/properties/real-states/${id}`);
  },
  get: async function (id) {
    return await api.get(`/properties/${id}`);
  },
  put: async function (data) {
    return await api.put("/properties", {
      ...data,
    });
  },
  delete: async function (id) {
    return await api.delete(`/properties/${id}`);
  },
};
