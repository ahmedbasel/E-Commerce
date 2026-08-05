export interface Orderdata {
  _id: string;
  user: User;
  cartItems: CartItem[];
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
}

export interface ShippingAddress {
  city: string;
  phone: string;
  details: string;
}
