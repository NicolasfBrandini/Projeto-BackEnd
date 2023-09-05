import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  title: String,
  discription: String,
  //categories: mongoose.Schema.Types.ObjectId,
  categories: String,
});

export default mongoose.model("Work", workSchema);
