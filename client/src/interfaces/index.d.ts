export interface Coffee {
  _id: string;
  title: string;
  body: string;
  shop?: Shop;
}


export interface Shop {
  _id: string;
  name: string;
  type: string;
  age: number;
  coffees?: Shop[];
}