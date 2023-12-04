import api, { getClientToken } from "../Api";
import * as FileSystem from "expo-file-system";
import axios from 'axios';

export default propertiesWS = {
  post: async function (data) {
    return await api.post("/properties", {
      ...data,
    });
  },
  postMedia: async function (media, propertyId) {
    const token = getClientToken();
    const formData = new FormData();
    media.forEach((valor) => {
      const pos1 = valor.lastIndexOf("/");
      const fileName = valor.substring(pos1 + 1);
      formData.append("photos", {
        uri: valor,
        name: fileName,
        type: `image/${fileName.split(".")[1]}`,
      });
    });
  
    try {
      const res = await axios.post(`/properties/${propertyId}/loadMultimedia`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });
    } catch (error) {
      console.log("Error caught:", error);
    }
  },
  getFav: async function (id) {
    return await api.get(`/properties/${id}/favorites`);
  },
  addFav: async function (userId, propertyId) {
    return await api.post("/properties/addFavorites", {
      userId,
      propertyId,
    });
  },
  deleteFav: async function (userId, propertyId) {
    return await api.delete(
      `/properties/${userId}/${propertyId}/deleteFavorites`
    );
  },
  search: async function (data) {
    return await api.post("/properties/propertyBy", {
      ...data,
    });
  },
  getNearest: async function (latitude, longitude) {
    return await api.post("/properties/nearestProperties", {
      latitude,
      longitude,
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
