import sendRequest from "../../utils/send-request.util";
import axios from "axios";
import sendRequestUtil from "../../utils/send-request.util";

const GigsApi = {
  getAllGigs: async ({ search, min, max, sort }) => {
    const response = await sendRequest.get(
      `/gigs?${search}&min=${min}&max=${max}&sort=${sort}`
    );
    return response.data;
  },
  showGig: async (id) => {
    const response = await sendRequest.get(`/gigs/${id}`);
    return response.data;
  },
};


export default GigsApi;
