import mongoose from "mongoose";

const ClientsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Название обязательно'],
    trim: true,
    maxlength: [100, 'Название не больше 100 символов']
  },
  description: {
    type: String,
    required: [true, 'Описание обязательно'],
    trim: true,
    maxlength: [500, 'Описание не больше 500 символов']
  },
  year: {
    type: Number,
    required: [true, 'Место обязательно'],
    trim: true
  },
  domain: {
    type: String, 
    required: true,
  },
}, {
  timestamps: true 
});

export default mongoose.model("Clients", ClientsSchema, "Clients")