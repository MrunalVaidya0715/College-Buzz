import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    upvote: {
      type: Number,
      default: 0, 
    },
    upvotedBy: [
      { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
      }
    ],
    downvote: {
      type: Number,
      default: 0,
    },
    downvotedBy: [
      { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
      }
    ],
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Question", questionSchema);
