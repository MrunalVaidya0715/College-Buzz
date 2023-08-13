import Word from "../models/badword.model.js";
import createError from "../utils/createError.js";

export const createBadword  = async(req, res, next) =>{
    try {
        const {word} = req.body;
        const badword = await Word.findOne({word:word})
        if(badword){
            return next(createError(403, "Word already exists in List"));
        }
        const newWord = new Word({
            word: word,
        })
        await newWord.save();
        res.send(201).send(newWord)
    } catch (error) {
        next(error)
    }
}

export const getBadwords = async (req, res, next) => {
  try {
    const badwords = await Word.find();
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

    await Word.findByIdAndRemove(wordId);

    res.status(200).send("Word deleted successfully");
  } catch (error) {
    next(error);
  }
};
