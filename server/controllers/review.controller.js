import errorHandlerUtil from "../utils/error-handler.util.js";
import Review from "../models/Review.model.js";
import Gig from "../models/Gig.model.js";

const ReviewController = {
  getAllReviews: async (req, res, next) => {
    const { gigId } = req.params;
    try {
      const reviews = await Review.find({ gigId: gigId });

      return res.status(200).send(reviews);
    } catch (error) {
      next(error);
    }
  },
  createReview: async (req, res, next) => {
    const { gigId, description, stars } = req.body;
    // check if the user is seller or not
    if (req.isSeller)
      return next(errorHandlerUtil(403, "Seller's can't create a review"));

    const newReview = new Review({
      userId: req.userId,
      gigId: gigId,
      star: stars,
      description,
    });

    try {
      // check if the user submit review before
      const review = await Review.findOne({ gigId: gigId, userId: req.userId });

      if (review)
        return next(
          errorHandlerUtil(403, "You have already submitted review!")
        );
      // save the review
      const savedReview = await newReview.save();

      // increment reviews number on gig model
      await Gig.findByIdAndUpdate(gigId, {
        $inc: { totalStars: stars, starNumber: 1 },
      });

      return res.status(200).send(savedReview);
    } catch (error) {
      next(error);
    }
  },
  deleteReview: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};

export default ReviewController;
