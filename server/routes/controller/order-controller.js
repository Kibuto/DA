const Order = require('../../models/orders.model');
require('dotenv').config();

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
        console.log(order);
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
            console.log("order admin: ", order);
            if (order.length) {
                res.send({
                    success: true,
                    isAdmin,
                    product,
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
            console.log("order user: ", order);
            // if (order.length) {
            //     order.map(item => {
            //         item.userId = jwt.sign({ userId: item.userId }, process.env.jwtKey)
            //     })
            //     res.send({
            //         success: true,
            //         order: order,
            //         message: 'get data successfully'
            //     })
            // }
            // else {
            //     res.send({
            //         success: false,
            //         message: 'You do not sell any product'
            //     })
            // }
        });
    }
}