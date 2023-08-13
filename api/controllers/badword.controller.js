import Word from "../models/badword.model.js";
import createError from "../utils/createError.js";

export const createBadword = async (req, res, next) => {
  try {
      const userId = req.userId;
      const { word } = req.body;
      
      const badword = await Word.findOne({ userId: userId, word: word });

      if (badword) {
          return next(createError(403, "Word already exists in List"));
      }

      const newWord = new Word({
          userId: userId,
          word: word,
      });

      await newWord.save();
      res.status(201).send(newWord); // Corrected the response status
  } catch (error) {
      next(error);
  }
}
export const getBadwords = async (req, res, next) => {
  try {
    const userId  = req.userId
    const badwords = await Word.find({userId: userId});
    res.status(200).send(badwords);
  } catch (error) {
    next(error);
  }
};

export const deleteBadword = async (req, res, next) => {
  const wordId = req.params.wordId;
  try {
    
    const badword = await Word.findById(wordId);
    if (!badword) {
      return next(createError(404, "Word not found"));
    }
    if (badword.userId !== req.userId) {
      return next(createError(403, "Only Owner can delete this Word"));
    }

    await Word.findByIdAndRemove(wordId);

    res.status(200).send("Word deleted successfully");
  } catch (error) {
    next(error);
  }
};
