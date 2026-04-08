import Section from "@/layouts/Section";
import "./PricingDetails.scss";
import useApi from "@/hooks/useApi";
import type { AdditionalPrices, Estate } from "@/interfaces/interfaces";
import getCurrentPrice from "@/utils/getCurrentPrice";
import PriceCardComponent from "@/components/PriceCard";
import { data } from "react-router-dom";

export interface PriceRow {
  label: string;
  amount: number | string;
  note?: string;
}

export interface PriceCard {
  title: string;
  rows: PriceRow[];
  total?: number;
}

const buildCards = (
  prices: AdditionalPrices,
  totalPrice: number,
): PriceCard[] => [
  {
    title: "Additional Fees",
    rows: [
      {
        label: "Property Transfer Tax",
        amount: prices.additionalFees.propertyTransferTax.amount,
        note: prices.additionalFees.propertyTransferTax.note,
      },
      {
        label: "Legal Fees",
        amount: prices.additionalFees.legalFees.amount,
        note: prices.additionalFees.legalFees.note,
      },
      {
        label: "Home Inspection",
        amount: prices.additionalFees.homeInspection.amount,
        note: prices.additionalFees.homeInspection.note,
      },
      {
        label: "Property Insurance (Annual)",
        amount: prices.additionalFees.propertyInsuranceAnnual.amount,
        note: prices.additionalFees.propertyInsuranceAnnual.note,
      },
      {
        label: "Mortgage Fees",
        amount: prices.additionalFees.mortgageFees.amount,
        note: prices.additionalFees.mortgageFees.note,
      },
    ],
    total: prices.additionalFees.totalAdditionalFees,
  },
  {
    title: "Monthly Expenses",
    rows: [
      {
        label: "Property Taxes",
        amount: prices.monthlyExpenses.propertyTaxes.amount,
        note: prices.monthlyExpenses.propertyTaxes.note,
      },
      {
        label: "HOA Fee",
        amount: prices.monthlyExpenses.hoaFee.amount,
        note: prices.monthlyExpenses.hoaFee.note,
      },

      {
        label: "Mortgage Payment",
        amount: prices.monthlyExpenses.mortgagePayment.amount,
        note: prices.monthlyExpenses.mortgagePayment.note,
      },
      {
        label: "Property Insurance",
        amount: prices.monthlyExpenses.propertyInsurance.amount,
        note: prices.monthlyExpenses.propertyInsurance.note,
      },
    ],
  },
  {
    title: "Total Initial Costs",
    rows: [
      {
        label: "Listing Price",
        amount: totalPrice,
      },
      {
        label: "Additional Fees",
        amount:
          prices.additionalFees.propertyTransferTax.amount +
          prices.additionalFees.homeInspection.amount +
          prices.additionalFees.legalFees.amount +
          prices.additionalFees.propertyInsuranceAnnual.amount,
        note: "Property transfer tax, legal fees, inspection, insurance",
      },
      {
        label: "Down Payment",
        amount: prices.initialCosts.downPayment.amount,
        note: `${prices.initialCosts.downPayment.percentage}%`,
      },
      {
        label: "Mortgage Amount",
        amount: prices.initialCosts.mortgageAmount.amount,
        note: prices.initialCosts.mortgageAmount.note,
      },
    ],
  },
];

const PricingDetails = ({ id }: { id: string | undefined }) => {
  const { data } = useApi<Estate>("properties", id);

  const cards = data?.additionalPrices
    ? buildCards(data.additionalPrices, data.price)
    : [];

  return (
    <Section
      className="pricing-details"
      title="Comprehensive Pricing Details"
      description="At Estatein, transparency is key. We want you to have a clear understanding of all costs associated with your property investment. Below, we break down the pricing for Seaside Serenity Villa to help you make an informed decision"
      hasButton={false}
      hasSlider={false}
    >
      <div className="pricing-details__note">
        <div className="h5">Note</div>
        <p className="description">
          The figures provided above are estimates and may vary depending on the
          property, location, and individual circumstances.
        </p>
      </div>
      <div className="pricing-details__main">
        <aside className="pricing-details__aside">
          <span className="description pricing-details__aside-title">
            Listing Price
          </span>
          <span
            className="pricing-details__aside-cost h3"
            style={{ fontWeight: 600 }}
          >
            ${getCurrentPrice(data?.price)}
          </span>
        </aside>
        <div className="pricing-details__cards-list">
          {cards.map((card) => (
            <PriceCardComponent {...card} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PricingDetails;
