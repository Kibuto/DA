var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema({
    userId: String,
    name: String,
    price: String,
    cartItems: Array,
    amount: Number,
    address: String,
    phone: String,
    date: {
        type: Date,
        default: Date.now()
    },
    deliveryDate: {
        type: Date
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

var order = mongoose.model("order", OrderSchema, "order");

module.exports = order;
