import axios from "axios";
import { client, items } from "../utils/types";

const api = axios.create({
  baseURL: "https://restaurant-server.onrender.com",
});

export const getMenu = () => {
  return api.get("/product");
};

export const sendOrder = (products: items[], client: client) => {
  return api.post("/orders/add", {
    client: {
      firstName: client.name.split(" ")[0],
      lastName: client.name.split(" ")[1],
      mobileNum: +client.mobile,
      city: client.city,
      address: client.address,
    },
    products: products.map((product) => {
      return {
        productName: product.itemName,
        productId: product.id,
        orderQty: product.orderQty,
      };
    }),
  });
};

export const getDashboardOrders = () => {
  return api.get("/orders");
};

export const checkOrders = (id: number) => {
  return api.post(`/orders/${id}/completed`);
};
