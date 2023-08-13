import mongoose from "mongoose";

const { Schema } = mongoose;

const wordSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Word", wordSchema);
