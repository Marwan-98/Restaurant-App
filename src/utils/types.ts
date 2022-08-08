export type items = {
  id: number;
  url: string;
  itemName: string;
  description: string;
  price: number;
  popular: boolean;
  category: {
    id: number;
    name: string;
  };
  orderQty: any;
};

export type cartItems = {
  productId: number;
  orderQty: number;
};

export type client = {
  name: string;
  mobile: string;
  address: string;
  city: string;
};

export type menu = {
  id: number;
  itemName: string;
  descritption: string;
  price: number;
  popular: boolean;
  category: {
    id: number;
    name: string;
  };
};

export type order = {
  orderId: number,
  itemId: number
}

export type OrderLine = {
  id: number;
  orderId: number;
  productName: string;
  productId: number;
  orderQty: number;
  completed: boolean;
}

export type orders = {
  id: number;
  completed: boolean;
  createdAt: string;
  firstName: string;
  lastName: string;
  mobileNum: number;
  city: string;
  address: string;
  orderLine: OrderLine[];
};

export type locationType = {
  hash: string
  key: string
  pathname: string
  search: string
  state: any
}