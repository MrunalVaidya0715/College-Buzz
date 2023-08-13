import mongoose from "mongoose";

const { Schema } = mongoose;

const wordSchema = new Schema(
  {
    
    word: {
      type: String,
      required: true,
      unique:true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Word", wordSchema);
