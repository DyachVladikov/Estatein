import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя обязательно'],
    trim: true,
    maxlength: [50, 'Имя не больше 50 символов']
  },
  place: {
    type: String,
    required: [true, 'Место обязательно'],
    trim: true
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'agent', 'admin'],
    default: 'buyer'
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reviews",
  }
}, {
  timestamps: true
});

export default mongoose.model("User", UserSchema)