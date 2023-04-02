import sendRequest from "../../utils/send-request.util";

const OrdersApi = {
  createOrder: async (gigId) => {
    const response = await sendRequest.post(`/orders/create-order/${gigId}`);
    return response.data;
  },
  getOrders: async () => {
    const response = await sendRequest.get("/orders");
    return response.data;
  },
};

export default OrdersApi;
