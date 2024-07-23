import axios from "axios";
import { User, Product, ProductInLocalStorage } from "../types/main";

type LoginResponse = {
  token: string;
};

export const loginUser = (username: string, password: string) => {
  return axios.post<LoginResponse>("https://fakestoreapi.com/auth/login", {
    username,
    password,
  });
};

type GetAllUsersResponse = User[];

export const getAllUsers = () => {
  return axios.get<GetAllUsersResponse>("https://fakestoreapi.com/users");
};

type GetAllProductsResponse = Product[];

export const getAllProducts = () => {
  return axios.get<GetAllProductsResponse>("https://fakestoreapi.com/products");
};

/* Carts API */

type UserCart = {
  id: number;
  userId: number;
  date: string;
  products: ProductInLocalStorage[];
};

export const getUserCarts = (userId: number) => {
  return axios.get<UserCart[]>(`https://fakestoreapi.com/carts/user/${userId}`);
};

export const createNewCart = (
  userId: number,
  products: ProductInLocalStorage[]
) => {
  return axios.post<UserCart>("https://fakestoreapi.com/carts", {
    userId,
    products,
    date: new Date().toString(),
  });
};

export const updateExistingCart = (
  cartId: number,
  userId: number,
  products: ProductInLocalStorage[]
) => {
  return axios.put<UserCart>(`https://fakestoreapi.com/carts/${cartId}`, {
    userId,
    products,
    date: new Date().toString(),
  });
};
