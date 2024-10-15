const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  name: String,
  amount: Number
});

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;