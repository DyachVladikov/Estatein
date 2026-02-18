export interface User {
    name: string,
    place: string,
    img: string
}

export interface Review {
    rating: number,
    description: string,
    title: string,
    _id: string,
    user: User,
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
  type: string,
}

export interface FAQ {
    _id: string,
    question: string,
    answer: string,
    datePublication: Date,
    author: User,
}

export interface Error {
    HasError: boolean,
    message?: string,
    status: number,
}