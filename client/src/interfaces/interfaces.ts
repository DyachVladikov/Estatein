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
