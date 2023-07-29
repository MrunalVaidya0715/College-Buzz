import Question from "../models/question.model.js";
import Answer from "../models/answer.model.js";
import createError from "../utils/createError.js";

export const createAnswer = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { questionId } = req.body;
    const question = await Question.findOne({ _id: questionId });
    if (!question) {
      return next(createError(404, "Question Doesn't Exist"));
    }
    const newAnswer = new Answer({
      userId: userId,
      userInfo: userId,
      ...req.body,
    });
    const savedAnswer = await newAnswer.save();
    question.answers.push(savedAnswer._id);
    await question.save();
    res.status(201).send(savedAnswer);
  } catch (error) {
    next(error);
  }
};

export const getAnswersByQuesId = async (req, res, next) => {
  try {
    const questionId = req.params.quesId;
    const answers = await Answer.find({ questionId }).populate("userInfo","-password");
    res.status(200).send(answers);
  } catch (error) {
    next(error);
  }
};
