import api from "../Api";

export default userWS = {
  get: async function (id) {
    return await api.get(`/users/${id}`);
  },
  put: async function (data) {
    const { id, fullName, profilePictureUrl } = data;
    const formData = new FormData();
    const json = {
      userId: id,
      name: fullName
    };
    formData.append("userRequestIn", JSON.stringify(json));
    formData.append("photo", {
        uri: profilePictureUrl,
        name: 'profilePicture',
        type: `image/jpg`,
      });
    const token = getClientToken();
    console.log('token: ', token);
    return await fetch('https://backend-myhome.onrender.com/myhome/users', {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`
      },
    });
  },
  delete: async function (id) {
    return await api.delete(`/users/${id}`);
  },
};
