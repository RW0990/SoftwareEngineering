const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  email: String,
  password: String,
  cardNumber: String,
  cvv: String,
  expiryDate: Date,
});

module.exports = mongoose.model("Checkout", checkoutSchema);
