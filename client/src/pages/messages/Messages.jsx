import React from "react";
import "./Messages.scss";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import ConversationsApi from "../../api/conversations/conversations-api";
import moment from "moment";

function Messages(props) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Get all orders from api
  const {
    isLoading,
    data: conversations,
    error,
  } = useQuery("conversations", () => {
    return ConversationsApi.getConversations();
  });

  console.log(conversations);

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            {conversations.map((item, index) => (
              <tbody key={index}>
                <tr
                  className={
                    (currentUser.isSeller && !item.readBySeller) ||
                    (!currentUser.isSeller && !item.readByBuyer && "active")
                  }
                >
                  <td>{currentUser.isSeller ? item.buyerId : item.sellerId}</td>
                  <td>
                    <Link to="/message/123" className="link">
                      {item?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(item.updatedAt).fromNow()}</td>
                  <td>
                    {(currentUser.isSeller && !item.readBySeller) ||
                      (!currentUser.isSeller && !item.readByBuyer && (
                        <button>Mark as Read</button>
                      ))}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default Messages;
