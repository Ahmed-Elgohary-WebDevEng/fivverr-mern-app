import sendRequest from "../../utils/send-request.util";

const ConversationsApi = {
  createConversation: async () => {},
  updateConversation: async () => {},
  getConversations: async () => {
    const response = await sendRequest.get("/conversations");
    return response.data;
  },
  getSingleConversation: async () => {},
};

export default ConversationsApi;
