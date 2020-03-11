var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  id: String,
  images: Array,
  name: String,
  price: String,
  description: String,
  author: String,
  category: String,
  seller: {
    type: String,
    default: 'Admin'
  },
  isDeleted: {
    type: Boolean,
    default: false 
  },
  isCheck: {
    type: Boolean,
    default: true
  }
});

var Products = mongoose.model("Products", productSchema, "products");

module.exports = Products;
