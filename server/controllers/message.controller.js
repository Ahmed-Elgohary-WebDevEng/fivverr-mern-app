import Message from "../models/Message.model.js";
import Conversation from "../models/Conversation.model.js";

const MessageController = {
  createMessage: async (req, res, next) => {
    const { conversationId, description } = req.body;
    const newMessage = new Message({
      conservationId: conversationId,
      userId: req.userId,
      description: description,
    });
    try {
      const savedMessage = await newMessage.save();
      await Conversation.findOneAndUpdate(
        { id: conversationId },
        {
          $set: {
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
            lastMessage: description,
          },
        },
        {
          new: true,
        }
      );

      return res.status(201).send(savedMessage);
    } catch (error) {
      next(error);
    }
  },
  getMessages: async (req, res, next) => {
    const { convId } = req.params;

    try {
      const messages = await Message.find({ conservationId: convId });

      return res.status(200).send(messages);
    } catch (error) {
      next(error);
    }
  },
};

export default MessageController;
