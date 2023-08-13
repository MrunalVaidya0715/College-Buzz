import Word from "../models/badword.model.js";
import createError from "../utils/createError.js";
import mongoose from "mongoose";

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
  try {
    const {word} = req.body;
    
    const badword = await Word.findOne({word: word});
    if (!badword) {
      return next(createError(404, "Word not found"));
    }

   

    await Word.findOneAndDelete({word:word});

    res.status(200).json({ message: "Word deleted successfully" });
  } catch (error) {
    next(error);
  }
};
