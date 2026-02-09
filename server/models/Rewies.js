import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'Рейтинг обязателен'],
    min: [1, 'Рейтинг от 1 до 5'],
    max: [5, 'Рейтинг от 1 до 5']
  },
  title: {
    type: String,
    required: [true, 'Описание обязательно'],
    maxlength: [10, 'Описание не больше 10 символов']
  },
  description: {
    type: String,
    required: [true, 'Описание обязательно'],
    trim: true,
    maxlength: [500, 'Описание не больше 500 символов']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model("Rewies", ReviewSchema, "Rewies")