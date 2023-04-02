import React from "react";
import "./Orders.scss";
import { useQuery } from "react-query";
import OrdersApi from "../../api/orders/orders-api";
import {useNavigate} from "react-router-dom";
import sendRequest from "../../utils/send-request.util";

function Orders(props) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
        sendRequest.get(`/orders`).then((res) => {
          return res.data;
        }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await sendRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await sendRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
      <div className="orders">
        {isLoading ? (
            "loading"
        ) : error ? (
            "error"
        ) : (
            <div className="container">
              <div className="title">
                <h1>Orders</h1>
              </div>
              <table>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Contact</th>
                </tr>
                {data.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <img className="image" src={order.img} alt="" />
                      </td>
                      <td>{order.title}</td>
                      <td>{order.price}</td>
                      <td>
                        <img
                            className="message"
                            src="./img/message.png"
                            alt=""
                            onClick={() => handleContact(order)}
                        />
                      </td>
                    </tr>
                ))}
              </table>
            </div>
        )}
      </div>
  );
}

export default Orders;
