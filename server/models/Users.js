import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  place: String,
  img: String,
  createdAt: Date,
  updatedAt: Date,

  role: {
    type: String,
    enum: ['buyer', 'employee', 'seller'],
    default: 'buyer',
  },

  email: String,
  password: String,

  employeeInfo: {
    position: String,
    department: String,
    salary: Number,
  },
  buyerInfo: {
    loyaltyLevel: String,
  },
}, { timestamps: true });

export default mongoose.model("Users", UserSchema, "Users")