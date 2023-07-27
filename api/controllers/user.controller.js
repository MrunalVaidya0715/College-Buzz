import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import mongoose from "mongoose";
export const getUser = async (req, res, next) => {
  try {
    
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      // If the questionId is not a valid ObjectId
      return next(createError(404, "User not found"));
    }
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not Found"));
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
