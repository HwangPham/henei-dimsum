// models/Order.js
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  dishId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    required: true
  }
});

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: ""
  }
});

const OrderSchema = new mongoose.Schema({
  items: [OrderItemSchema],
  customer: CustomerSchema,
  totalPrice: {
    type: Number,
    required: true
  },

  // 👇 TRẠNG THÁI ĐƠN HÀNG
  status: {
    type: String,
    enum: ["pending", "confirmed", "done", "cancelled"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
