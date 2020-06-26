const Product = require("../../models/product.model.js");
const checkProduct = require('../../models/checkProducts.model');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!!!')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('avatar');


const fs = require('fs');

module.exports.index = async (req, res, next) => {
    const { body } = req.body;
    await Product.find({
        category: body
    }, (err, category) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        if (category.length < 1) {
            return res.send({
                success: false,
                message: 'Error: Category Invalid'
            })
        }
        return res.send({
            success: true,
            message: category
        })
    });
};

module.exports.create = (req, res, next) => {
    upload(req, res, (err) => {
        const { body, file, userId, seller } = req;
        const { name, price, category, description } = body;
        if (err) {
            res.send({
                success: false,
                msg: err
            })
        } else {
            let newProduct = new checkProduct();
            newProduct.userId = userId;
            newProduct.name = name;
            newProduct.author = seller;
            newProduct.seller = seller;
            newProduct.price = price;
            newProduct.category = category;
            newProduct.images = [{ url: `/api/open_image?image_name=${file.filename}` }];
            newProduct.description = description;
            newProduct.save((err, checkProduct) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error.'
                    })
                } else {
                    return res.send({
                        success: true,
                        message: 'Upload product successfully'
                    })
                }
            })
        }
    })
};

module.exports.getImage = async (req, res, next) => {
    let imageName = 'public/uploads/' + req.query.image_name;
    fs.readFile(imageName, (err, imageData) => {
        if (err) {
            res.send({
                success: false,
                message: `Can't read image ${err}`
            });
            return;
        }
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(imageData);
    })
};

module.exports.getProduct = async (req, res, next) => {
    const { userId, isAdmin } = req;
    if (isAdmin) {
        await checkProduct.find({
            isCheck: false
        }, (err, product) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'Server error when get product'
                })
            }

            if (product.length) {
                product.map(item => {
                    item.userId = jwt.sign({ userId: item.userId }, process.env.jwtKey)
                })
                res.send({
                    success: true,
                    isAdmin,
                    product,
                    message: "Get product successfully"
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
        await checkProduct.find({
            userId: userId
        }, (err, product) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            }
            if (product.length) {
                product.map(item => {
                    item.userId = jwt.sign({ userId: item.userId }, process.env.jwtKey)
                })
                res.send({
                    success: true,
                    product: product,
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

};

module.exports.checkProduct = async (req, res, next) => {
    const { body } = req;
    console.log('run check');
    await checkProduct.findByIdAndUpdate({
        _id: body.id
    }, {
        $set: { isCheck: true }
    },
        (err, product) => {
            console.log(product);
            if (err) {
                res.send({
                    success: false,
                    message: 'Server error when check product'
                })
            }

            if (product.length < 1) {
                res.send({
                    success: false,
                    message: 'Product invalid'
                })
            }

            let newProduct = new Product();
            newProduct.images = product.images;
            newProduct.name = product.name;
            newProduct.price = product.price;
            newProduct.author = product.author;
            newProduct.description = product.description;
            newProduct.category = product.category;
            newProduct.isDeleted = product.isDeleted;
            newProduct.seller = product.seller;
            console.log("Create new product ");
            newProduct.save((err, curProduct) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Server error when save product'
                    })
                } else {
                    return res.send({
                        success: true,
                        message: 'Your product were checked'
                    })
                }
            })
        })
};

module.exports.refuseProduct = async (req, res, next) => {
    const { body } = req;
    console.log('run refuse');
    await checkProduct.findByIdAndUpdate({
        _id: body.id
    }, {
        $set: { isCheck: true, isDeleted: true }
    },
        (err, product) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'Server error when check product'
                })
            } else {
                res.send({
                    success: true,
                    message: 'Your product is invalid'
                })
            }
        })
};

module.exports.notifications = async (req, res, next) => {
    const { userId, userName } = req;
    const amount = await checkProduct.find({
        userId,
        isCheck: true,
        seen: false
    })

    await checkProduct.find({
        userId,
        isCheck: true
    }, (err, list) => {
        if (err) {
            res.send({
                success: false,
                message: 'Server error when check product'
            })
        }

        if (userName) {
            res.send({
                success: true,
                message: 'Respond data successfully',
                name: userName,
                amount: amount.length,
                data: list
            })
        }
        else {
            res.send({
                success: true,
                message: 'Respond data successfully',
                amount: amount.length,
                data: list
            })
        }
    })

}

module.exports.checkNotifications = async (req, res, next) => {
    const { userId } = req;
    await checkProduct.updateMany({
        userId,
        isCheck: true
    }, {
        $set: { seen: true }
    }, (err, product) => {
        console.log(product);
        if (err) {
            res.send({
                success: false,
                message: 'Server error check notifications'
            })
        }
        else {
            res.send({
                success: true,
                message: 'Respond data successfully'
            })
        }
    })
}

module.exports.deleteProduct = async (req, res, next) => {
    const { body } = req;
    await checkProduct.findByIdAndDelete({
        _id: body.id
    }, (err, product) => {
        if (err) {
            res.send({
                success: false,
                message: 'Server error when delete order'
            })
        }
        else {
            res.send({
                success: true,
                message: 'Delete order succesfully'
            })
        }
    })
}