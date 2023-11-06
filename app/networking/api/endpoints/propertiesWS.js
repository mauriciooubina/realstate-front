import api from "../Api";
import * as DocumentPicker from "expo-document-picker";

export default propertiesWS = {
  post: async function (data) {
    return await api.post("/properties", {
      ...data,
    });
  },
  postMedia: async function (media) {
    const formData = new FormData();
    formData.append("file", {
      uri: "file://path/to/your/file",
      name: "example.jpg",
      type: "image/jpeg",
    });
    return await fetch('https://backend-myhome.onrender.com//myhome/properties/loadMultimedia', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
