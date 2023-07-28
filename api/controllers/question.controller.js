import Question from "../models/question.model.js";
import createError from "../utils/createError.js";
import mongoose from "mongoose";
export const createQuestion = async (req, res, next) => {
  const newQuestion = new Question({
    userId: req.userId,
    userInfo: req.userId,
    ...req.body,
  });

  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).send(savedQuestion);
  } catch (err) {
    next(err);
  }
};

export const getQuestions = async (req, res, next) => {
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
export const getQuestionsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const questions = await Question.find({ userId });
    res.status(200).send(questions);
  } catch (error) {
    next(error);
  }
};

export const getQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      // If the questionId is not a valid ObjectId
      return next(createError(404, "Question not found"));
    }

    const question = await Question.findById(questionId).populate(
      "userInfo",
      "-password"
    );
    if (!question) {
      // If the question is not found in the database
      return next(createError(404, "Question not found"));
    }

    // If the question is found, send it as a response
    res.status(200).json(question);
  } catch (err) {
    // Handle other errors
    next(err);
  }
};

export const deleteQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      // If the questionId is not a valid ObjectId
      return next(createError(404, "Question Doesn't Exist"));
    }

    const question = await Question.findById(questionId);
    if (!question) {
      // If the question is not found in the database
      return next(createError(404, "Question Doesn't Exist"));
    }

    if (question.userId !== req.userId) {
      return next(createError(403, "Only Owner can Delete their own Post!"));
    }

    await Question.findByIdAndDelete(questionId);
    res.status(200).send("Question has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const handleUpvote = async (req, res, next) => {
  const questionId = req.params.id;
  const userId = req.userId;
  try {
    const question = await Question.findById(questionId);

    // Check if the user's ID is already in the downvotedBy array
    if (question.downvotedBy.includes(userId)) {
      // If the user already downvoted, remove the user's ID from the array
      question.downvotedBy = question.downvotedBy.filter(
        (id) => id.toString() !== userId
      );
      question.downvote -= 1;
    }

    // Check if the user's ID is already in the upvotedBy array
    if (question.upvotedBy.includes(userId)) {
      // If the user already upvoted, remove the user's ID from the array
      question.upvotedBy = question.upvotedBy.filter(
        (id) => id.toString() !== userId
      );
      question.upvote -= 1;
    } else {
      // If the user hasn't upvoted yet, add the user's ID to the array
      question.upvotedBy.push(userId);
      question.upvote += 1;
    }

    // Save the updated question
    await question.save();

    res.status(200).send(question);
  } catch (error) {
    next(error);
  }
};


export const handleDownvote = async (req, res, next) => {
  const questionId = req.params.id;
  const userId = req.userId;
  try {
    const question = await Question.findById(questionId);

    // Check if the user's ID is already in the upvotedBy array
    if (question.upvotedBy.includes(userId)) {
      // If the user already upvoted, remove the user's ID from the array
      question.upvotedBy = question.upvotedBy.filter(
        (id) => id.toString() !== userId
      );
      question.upvote -= 1;
    }

    // Check if the user's ID is already in the downvotedBy array
    if (question.downvotedBy.includes(userId)) {
      // If the user already downvoted, remove the user's ID from the array
      question.downvotedBy = question.downvotedBy.filter(
        (id) => id.toString() !== userId
      );
      question.downvote -= 1;
    } else {
      // If the user hasn't downvoted yet, add the user's ID to the array
      question.downvotedBy.push(userId);
      question.downvote += 1;
    }

    // Save the updated question
    await question.save();

    res.status(200).send(question);
  } catch (error) {
    next(error);
  }
};
