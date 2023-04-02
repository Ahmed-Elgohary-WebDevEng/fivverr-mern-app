import Order from "../models/Order.model.js";
import Gig from "../models/Gig.model.js";
import errorHandlerUtil from "../utils/error-handler.util.js";
import Stripe from "stripe";

const OrderController = {
  getOrders: async (req, res, next) => {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    return res.status(200).send(orders);
  },
  intent: async (req, res, next) => {
    // create new instance of Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET, {});

    // Get the amount of order
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    // 2- Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();

    return res.status(200).send({ clientSecret: paymentIntent.client_secret });
  },
  confirm: async (req, res, next) => {
    const order = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      { $set: { isCompleted: true } }
    );
    return res.status(200).send("Orders have been confirmed");
  },
};

export default OrderController;
