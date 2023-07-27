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

    const questions = await Question.find().populate("userInfo", "-password");

    res.status(200).json(questions);
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

    const question = await Question.findById(questionId).populate("userInfo", "-password");
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
