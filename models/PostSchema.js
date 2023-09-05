import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  discription: String,
  //categories: mongoose.Schema.Types.ObjectId,
  categories: String,
});

export default mongoose.model("Post", postSchema);
