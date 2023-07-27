import mongoose, { Types } from "mongoose";

type OrderItemType = {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: Types.ObjectId;
};

type ShippingAddressType = {
  address: string;
  city: string;
  cep: string;
};

type PaymentResultsType = {
  id?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
};

interface OrderSchema {
  user: Types.ObjectId;
  orderItems: OrderItemType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  paymentResults: PaymentResultsType;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}

const orderSchema = new mongoose.Schema<OrderSchema>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      cep: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResults: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
