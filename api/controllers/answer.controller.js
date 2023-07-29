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

export const handleUpvote = async (req, res, next) => {
  const questionId = req.params.id;
  const userId = req.userId;
  try {
    const answer = await Answer.findById(questionId);

    // Check if the user's ID is already in the downvotedBy array
    if (answer.downvotedBy.includes(userId)) {
      // If the user already downvoted, remove the user's ID from the array
      answer.downvotedBy = answer.downvotedBy.filter(
        (id) => id.toString() !== userId
      );
      answer.downvote -= 1;
    }

    // Check if the user's ID is already in the upvotedBy array
    if (answer.upvotedBy.includes(userId)) {
      // If the user already upvoted, remove the user's ID from the array
      answer.upvotedBy = answer.upvotedBy.filter(
        (id) => id.toString() !== userId
      );
      answer.upvote -= 1;
    } else {
      // If the user hasn't upvoted yet, add the user's ID to the array
      answer.upvotedBy.push(userId);
      answer.upvote += 1;
    }

    // Save the updated question
    await answer.save();

    res.status(200).send(answer);
  } catch (error) {
    next(error);
  }
};


export const handleDownvote = async (req, res, next) => {
  const questionId = req.params.id;
  const userId = req.userId;
  try {
    const answer = await Answer.findById(questionId);

    // Check if the user's ID is already in the upvotedBy array
    if (answer.upvotedBy.includes(userId)) {
      // If the user already upvoted, remove the user's ID from the array
      answer.upvotedBy = answer.upvotedBy.filter(
        (id) => id.toString() !== userId
      );
      answer.upvote -= 1;
    }

    // Check if the user's ID is already in the downvotedBy array
    if (answer.downvotedBy.includes(userId)) {
      // If the user already downvoted, remove the user's ID from the array
      answer.downvotedBy = answer.downvotedBy.filter(
        (id) => id.toString() !== userId
      );
      answer.downvote -= 1;
    } else {
      // If the user hasn't downvoted yet, add the user's ID to the array
      answer.downvotedBy.push(userId);
      answer.downvote += 1;
    }

    // Save the updated question
    await answer.save();

    res.status(200).send(answer);
  } catch (error) {
    next(error);
  }
};