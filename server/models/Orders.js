import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  AdditionalEmail: {
    type: String,
    maxlength: [100, 'Название не больше 100 символов']
  },
  AdditionalPhone: {
    type: String,
    trim: true,
  },
  Bathrooms: {
    type: String,
    trim: true
  },
  Bedrooms: {
    type: String, 
  },
  Budget: {
    type: String,
  },
  Contact: {
    type: String,
  },
  Email: {
    type: String,
    required: [true, 'Почта обязательна'],
  },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Location: {
    type: String,
  },
  Message: {
    type: String,
    maxlength: [1500, "Описание не больше 1500 символов"]
  },
  Phone: {
    type: String,
    required: [true, 'Телефон обязателен'],
  },
  Type: {
    type: String,
  },
}, {
  timestamps: true 
});

export default mongoose.model("Orders", OrderSchema, "Orders")