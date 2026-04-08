export interface User {
  _id: string;
  name: string;
  place: string;
  img: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: string;
}

export interface Review {
  rating: number;
  description: string;
  title: string;
  _id: string;
  user: User;
}

export interface Estate {
  _id: string;
  name: string;
  description: string;
  place: string;
  price: number;
  bedroomsCount: number;
  bathroomsCount: number;
  area: number;
  images: string[];
  buildYear: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  annotation: string;
  featuresKeys?: string[];
  additionalPrices: AdditionalPrices | null;
}

export interface CostItem {
  amount: number;
  note: string;
}

export interface CostItemMixed {
  amount: number | string;
  note: string;
}

export interface DownPayment {
  amount: number;
  percentage: number;
}

export interface AdditionalFees {
  propertyTransferTax: CostItem;
  legalFees: CostItem;
  homeInspection: CostItem;
  propertyInsuranceAnnual: CostItem;
  mortgageFees: CostItemMixed;
  totalAdditionalFees: number;
}

export interface InitialCosts {
  downPayment: DownPayment;
  mortgageAmount: CostItem;
}

export interface MonthlyExpenses {
  propertyTaxes: CostItem;
  hoaFee: CostItem;
  propertyInsurance: CostItem;
  mortgagePayment: CostItemMixed;
}

export interface AdditionalPrices {
  _id: string;
  additionalFees: AdditionalFees;
  initialCosts: InitialCosts;
  monthlyExpenses: MonthlyExpenses;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  datePublication: Date;
  author: User;
}

export interface Error {
  HasError: boolean;
  message?: string;
  status: number;
}

export interface Employee extends User {
  chatLink: String;
  employeeInfo: {
    position: string;
  };
}
export interface ClientCard {
  _id: string;
  title: string;
  year: number;
  domain: string;
  category: string;
  description: string;
}
