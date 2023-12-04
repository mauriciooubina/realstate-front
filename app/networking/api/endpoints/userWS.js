import api, { getClientToken } from "../Api";
import axios from 'axios';

export default userWS = {
  get: async function (id) {
    return await api.get(`/users/${id}`);
  },
  put: async function (data) {
    const { id, fullName, profilePictureUrl } = data;
    const formData = new FormData();
    formData.append("photo", {
        uri: profilePictureUrl,
        name: 'profilePicture',
        type: `image/jpg`,
      });
    const token = getClientToken();
    try {
      const res = await axios.put(`/users/${id}/${fullName}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });
    } catch (error) {
      console.log("Error caught:", error);
    }
  },
  delete: async function (id) {
    return await api.delete(`/users/${id}`);
  },
};
