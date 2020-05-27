const Order = require('../../models/orders.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports.create = (req, res, next) => {
    const { body, userId } = req;
    const { cartItems, name, phone, address, sum, amount } = body;
    let newOrder = new Order();
    newOrder.userId = userId;
    newOrder.name = name;
    newOrder.cartItems = cartItems;
    newOrder.price = sum;
    newOrder.phone = phone;
    newOrder.address = address;
    newOrder.amount = amount;
    newOrder.save((err, order) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            })
        } else {
            return res.send({
                success: true,
                message: 'Create order successfully'
            })
        }
    })
};

module.exports.getOrder = async (req, res, next) => {
    const { userId, isAdmin } = req;
    if (isAdmin) {
        await Order.find({
            isCheck: false
        }, (err, order) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'Server error when get order'
                })
            }
            if (order.length) {
                res.send({
                    success: true,
                    isAdmin,
                    order,
                    message: "Get order successfully"
                })
            }

            else {
                res.send({
                    success: false,
                    message: "Get product unsuccessfully"
                })
            }
        })
    } else {
        await Order.find({
            userId: userId
        }, (err, order) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            }
            if (order.length) {
                order.map(item => {
                    item.userId = jwt.sign({ userId: item.userId }, process.env.jwtKey)
                })
                res.send({
                    success: true,
                    order: order,
                    isAdmin: false,
                    message: 'get data successfully'
                })
            }
            else {
                res.send({
                    success: false,
                    message: 'You do not sell any product'
                })
            }
        });
    }
}

module.exports.checkOrder = async (req, res, next) => {
    const { body } = req;
    await Order.findByIdAndUpdate({
        _id: body.body
    }, {
        $set: { isCheck: true }
    },
        (err, order) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'Server error when check order'
                })
            }

            if (order.length < 1) {
                res.send({
                    success: false,
                    message: 'Order invalid'
                })
            }

            res.send({
                success: true,
                message: 'Order checked successfully'
            })
        })
};

module.exports.refuseOrder = async (req, res, next) => {
    const { body } = req;
    await Order.findByIdAndUpdate({
        _id: body.body
    }, {
        $set: { isCheck: true, isDeleted: true }
    },
        (err, order) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'Server error when check order'
                })
            } else {
                res.send({
                    success: true,
                    message: 'Your order is invalid'
                })
            }
        })
};