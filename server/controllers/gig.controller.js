import errorHandlerUtil from "../utils/error-handler.util.js";
import Gig from "../models/Gig.model.js";

const GigController = {
  createGig: async (req, res, next) => {
    const gigInputs = req.body;
    console.log(gigInputs);
    // check is the user (Is Seller)
    if (!req.isSeller) {
      return next(errorHandlerUtil(403, "Only sellers can create a gig!"));
    }

    try {
      // create new gig
      const newGig = new Gig({ ...gigInputs, userId: req.userId });
      await newGig.save();
      return res.status(201).send(newGig);
    } catch (error) {
      next(error);
    }
  },
  deleteGig: async (req, res, next) => {
    const id = req.params.id;

    try {
      const gig = await Gig.findById(id);
      // check if the gig is existed
      if (!gig) return next(errorHandlerUtil(404, "Gig not found"));

      if (gig.userId !== req.userId)
        return next(errorHandlerUtil(403, "You can delete only your gigs"));

      await Gig.findByIdAndDelete(id);

      return res.status(200).send("Gig has been deleted Successfully");
    } catch (error) {
      next(error);
    }
  },
  showGig: async (req, res, next) => {
    const id = req.params.id;

    try {
      const gig = await Gig.findById(id);
      if (!gig) return next(errorHandlerUtil(404, "Gig not found"));

      return res.status(200).send(gig);
    } catch (error) {
      next(error);
    }
  },
  getAllGigs: async (req, res, next) => {
    const query = req.query;

    const filters = {
      ...(query.userId && { userId: query.userId }),
      ...(query.category && {
        category: { $regex: query.category, $options: "i" },
      }),
      ...((query.min || query.max) && {
        price: {
          ...(query.min && { $gt: query.min }),
          ...(query.max && { $lt: query.max }),
        },
      }),
      ...(query.search && { title: { $regex: query.search, $options: "i" } }),
    };
    // console.log(query);
    try {
      const gigs = await Gig.find(filters).sort({ [query.sort]: 1 });

      return res.status(200).send(gigs);
    } catch (error) {
      next(error);
    }
  },
  deleteAllGigs: async (req, res, next) => {
    try {
      await Gig.deleteMany({});

      return res.status(200).send("All gigs deleted successfully");
    } catch (error) {
      return next(error);
    }
  },
};

export default GigController;
