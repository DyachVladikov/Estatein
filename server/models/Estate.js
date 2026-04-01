import mongoose from "mongoose";

const EstateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Название обязательно"],
      trim: true,
      maxlength: [100, "Название не больше 100 символов"],
    },
    description: {
      type: String,
      required: [true, "Описание обязательно"],
      trim: true,
      maxlength: [500, "Описание не больше 500 символов"],
    },
    place: {
      type: String,
      required: [true, "Место обязательно"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Цена обязательна"],
      min: [0, "Цена не может быть отрицательной"],
    },
    bedroomsCount: {
      type: Number,
      required: true,
      min: [0, "Количество спален не может быть отрицательным"],
    },
    bathroomsCount: {
      type: Number,
      required: true,
      min: [0, "Количество ванных не может быть отрицательным"],
    },
    area: {
      type: Number,
      required: [true, "Площадь обязательна"],
      min: [0, "Площадь не может быть отрицательной"],
    },
    images: [
      {
        type: String,
      },
    ],
    type: {
      type: String,
    },
    annotation: {
      type: String,
    },
    featuresKeys: [
      {
        type: String,
      },
    ],

    buildYear: {
      type: Number,
      required: [true, "Год постройки обязателен"],
      min: [1800, "Год постройки не раньше 1800"],
      max: [new Date().getFullYear() + 1, "Год не может быть из будущего"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Estate", EstateSchema, "Estates");
