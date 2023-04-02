import Conversation from "../models/Conversation.model.js";
import errorHandlerUtil from "../utils/error-handler.util.js";

const ConversationController = {
  getConversations: async (req, res, next) => {
    try {
      const conversations = await Conversation.find(
        req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
      );
      res.status(200).send(conversations);
    } catch (error) {
      return next(error);
    }
  },
  createConversation: async (req, res, next) => {
    const newConversation = new Conversation({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.userId : req.body.to,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });
    try {
      const savedConversation = await newConversation.save();
      return res.status(201).send(savedConversation);
    } catch (error) {
      return next(error);
    }
  },
  getSingleConversation: async (req, res, next) => {
    const { convId } = req.params;

    try {
      const conversation = await Conversation.findOne({ id: convId }).sort({
        updatedAt: -1,
      });
      if (!conversation)
        return next(errorHandlerUtil(404, "Conversation not found!"));
      return res.status(200).send(conversation);
    } catch (error) {
      return next(error);
    }
  },
  updateConversation: async (req, res, next) => {
    const { convId } = req.params;
    try {
      const updatedConversation = await Conversation.findOneAndUpdate(
        { id: convId },
        {
          $set: {
            ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
          },
        },
        { new: true }
      );

      return res.status(200).send(updatedConversation);
    } catch (error) {
      return next(error);
    }
  },
};

export default ConversationController;
