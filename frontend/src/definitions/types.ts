export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

export type CartItem = {
  _id: string;
  quantity: number;
  price: number;
};

export type Cart = {
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
