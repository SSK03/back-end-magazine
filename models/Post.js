import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
