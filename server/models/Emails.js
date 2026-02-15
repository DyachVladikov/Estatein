import mongoose from "mongoose";

const EmailsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Название обязательно'],
    trim: true,
    maxlength: [100, 'Название не больше 100 символов']
  },
}, {
  timestamps: true 
});

export default mongoose.model("Emails", EmailsSchema, "Emails")