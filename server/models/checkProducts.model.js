var mongoose = require("mongoose");

var checkProductSchema = new mongoose.Schema({
  userId: String,
  images: Array,
  name: String,
  price: String,
  category: String,
  description: String,
  seller: String,
  author: String,
  seen: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  },
  isCheck: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

var checkProducts = mongoose.model("checkProducts", checkProductSchema, "checkProducts");

module.exports = checkProducts;
