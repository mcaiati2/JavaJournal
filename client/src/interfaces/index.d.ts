export interface Coffee {
  _id: string;
  title: string;
  body: string;
  flavor: string;
  shop?: Shop; // 'may be undefined/not present bc it's optional'
}


export interface Shop {
  _id: string;
  name: string;
  location: string;
  rating: number;
  coffees?: Shop[];
}

export interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
}