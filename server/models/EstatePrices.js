import mongoose from "mongoose";

const EstatePricesList = new mongoose.Schema(
  {
    additionalFees: {
      propertyTransferTax: {
        amount: {
          type: Number,
          min: [0, "Сумма не может быть отрицательной"],
        },
        note: {
          type: String,
          trim: true,
        },
      },
      legalFees: {
        amount: {
          type: Number,
          min: [0, "Сумма не может быть отрицательной"],
        },
        note: {
          type: String,
          trim: true,
        },
      },
      homeInspection: {
        amount: {
          type: Number,
          min: [0, "Сумма не может быть отрицательной"],
        },
        note: {
          type: String,
          trim: true,
        },
      },
      propertyInsuranceAnnual: {
        amount: {
          type: Number,
          min: [0, "Сумма не может быть отрицательной"],
        },
        note: {
          type: String,
          trim: true,
        },
      },
      mortgageFees: {
        amount: {
          type: mongoose.Schema.Types.Mixed, // Может быть числом или строкой ("Varies")
        },
        note: {
          type: String,
          trim: true,
        },
      },
      totalAdditionalFees: {
        type: Number,
        min: [0, "Сумма не может быть отрицательной"],
      },
    },
    initialCosts: {
      downPayment: {
        amount: {
          type: Number,
          min: [0, "Сумма не может быть отрицательной"],
        },
        percentage: {
          type: Number,
          min: [0, "Процент не может быть меньше 0"],
          max: [100, "Процент не может быть больше 100"],
        },
      },
      mortgageAmount: {
        amount: {
          type: Number,
          min: [0, "Сумма не может быть отрицательной"],
        },
        note: {
          type: String,
          trim: true,
        },
      },
    },
    monthlyExpenses: {
      propertyTaxes: {
        amount: {
          type: Number,
          min: [0, "Сумма не может быть отрицательной"],
        },
        note: {
          type: String,
          trim: true,
        },
      },
      hoaFee: {
        amount: {
          type: Number,
          min: [0, "Сумма не может быть отрицательной"],
        },
        note: {
          type: String,
          trim: true,
        },
      },
      propertyInsurance: {
        amount: {
          type: Number,
          min: [0, "Сумма не может быть отрицательной"],
        },
        note: {
          type: String,
          trim: true,
        },
      },
      mortgagePayment: {
        amount: {
          type: mongoose.Schema.Types.Mixed, // Может быть числом или строкой
        },
        note: {
          type: String,
          trim: true,
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model(
  "EstatePricesList",
  EstatePricesList,
  "EstatePricesList",
);
