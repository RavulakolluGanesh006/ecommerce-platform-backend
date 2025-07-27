const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  address: {
    fullName: String,
    mobileNo: String,
    houseNo: String,
    area: String,
    landmark: String,
    city: String,
    state: String,
    pincode: String,
    location: String,
    country: String,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    }
  ],
  amount: Number,
  paymentId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Order", orderSchema);
