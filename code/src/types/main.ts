// const age: number = 8;
// const text: string = "hello";
// const check: boolean = false;

// export interface User {
//   name: string;
//   email: string;
// }

// export type User2 = {
//   name: string;
//   email: string;
// };

// const user: User = {
//   name: "luka",
//   email: "@",
// };

// const addNumber = (number1: number, number2?: number) => {
//   if (number2) {
//     return number1 + number2;
//   }

//   return number1 + 2;
// };

export type User = {
  id: number;
  username: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
};

export type ProductInLocalStorage = {
  productId: number;
  quantity: number;
};
