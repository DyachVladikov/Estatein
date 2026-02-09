import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Рейтинг обязателен'],
    maxlength: [500, 'Описание не больше 500 символов']
  },
  answer: {
    type: String,
    required: [true, 'Рейтинг обязателен'],
    maxlength: [500, 'Описание не больше 500 символов']
  },
  date: {
    type: Date,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Users",
  },
}, {
  timestamps: true
});

export default mongoose.model("FAQS", FAQSchema, "FAQS")