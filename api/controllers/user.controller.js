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

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(createError(404, "User not found"));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account!"));
    }

    await Question.updateMany({ userId }, { $set: { userId: null, userInfo: null } });
  
    await Answer.updateMany({ userId }, { $set: { userId: null, userInfo: null } });

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    next(error);
  }
};
