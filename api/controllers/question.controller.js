import Question from "../models/question.model.js";
import createError from "../utils/createError.js";

export const createQuestion = async (req, res, next) => {
  
  const newQuestion = new Question({
    userId: req.userId,
    userInfo: req.userId,
    ...req.body,
  });

  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    next(err);
  }
};
