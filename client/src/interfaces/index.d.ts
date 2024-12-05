export interface Coffee {
  _id: string;
  title: string;
  body: string;
  flavor: string;
  shop?: Shop; 
}


export interface Shop {
  _id: string;
  name: string;
  location: string;
  rating: number;
  coffees?: Shop[];
}

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
}