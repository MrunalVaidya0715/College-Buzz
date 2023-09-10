import User from "../models/user.model.js";
import Question from "../models/question.model.js";
import Answer from "../models/answer.model.js";
import mongoose from "mongoose";
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};


export const getAdminQuestions = async (req, res, next) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: new RegExp(search, "i") };
    }

    let sortOption = { createdAt: -1 };

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    const questions = await Question.find(query)
      .sort(sortOption)
      .populate("userInfo", "-password");

    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

export const deleteAdminQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return next(createError(404, "Question Doesn't Exist"));
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return next(createError(404, "Question Doesn't Exist"));
    }

    //todo: Admin Check for Deleting or not

    await Answer.deleteMany({ questionId });

    await Question.findByIdAndDelete(questionId);
    res.status(200).send("Question and associated answers have been deleted!");
  } catch (err) {
    next(err);
  }
};
