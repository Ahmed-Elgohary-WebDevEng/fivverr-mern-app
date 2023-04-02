import sendRequest from "../../utils/send-request.util";
import React from "react";

const ReviewsApi = {
  getAllGigReviews: async (gigId) => {
    const response = await sendRequest.get(`/reviews/${gigId}`);
    return response.data;
  },
  createReview: async (review)  => {
    return await sendRequest.post("/reviews/create", review)
  }
};

export default ReviewsApi;
