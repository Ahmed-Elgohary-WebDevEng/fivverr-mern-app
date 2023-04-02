import sendRequest from "../../utils/send-request.util";

const UsersApi = {
  getUser: async (id) => {
    const response = await sendRequest.get(`/users/${id}`);
    return response.data;
  },
};

export default UsersApi
