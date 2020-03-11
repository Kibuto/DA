const Product = require("../../models/product.model.js");
const checkProduct = require('../../models/checkProducts.model');
const multer  = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!!!')
    }
}

const upload = multer({ 
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('avatar');


const fs = require('fs');

module.exports.index = async (req, res, next) => {
    const { category } = req.query;
    await Product.find({
        category: category
    }, (err, category) => {
        if(err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        if(category.length < 1) {
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
        if(err) {
            res.send({
                success: false,
                msg: err
            })
        } else {
            let newProduct = new checkProduct();
            newProduct.userId = userId;
            newProduct.name = name;
            newProduct.seller = seller;
            newProduct.price = price;
            newProduct.category = category;
            newProduct.images = [{url: `${process.env.HOST}/api/open_image?image_name=${file.filename}`}];
            newProduct.description = description;
            newProduct.save((err, checkProduct) => {
                if(err) {
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
        if(err) {
            res.send({
                success: false,
                message: `Can't read image ${err}`
            });
            return;
        }
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(imageData);
    })
};

module.exports.getProduct = async (req, res, next) => {
    const { userId, isAdmin } = req;
    if(isAdmin) {
        await checkProduct.find({
            isCheck: false
        }, (err, product) => {
            if(err) {
                res.send({
                    success: false,
                    message: 'Server error when get product'
                })
            }

            if(product.length) {
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
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            }
            if(product.length) {
                product.map(item => {
                    item.userId = jwt.sign({ userId: item.userId }, process.env.jwtKey)
                })
                res.send({
                    success: true,
                    product: product,
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
    const { body, userId } = req;
    await checkProduct.findByIdAndUpdate({
        _id: body.id
    }, {
        $set: { isCheck: true }
    },
    (err, product) => {
        if(err) {
            res.send({
                success: false,
                message: 'Server error when check product'
            })
        }

        if(product.length < 1) {
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
        console.log("Product: ", product.author);
        console.log("New product: ", newProduct.author);
        newProduct.save((err, curProduct) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Server error when save product'
                })
            } else {
                return res.send({
                    success: true,
                    message: 'Check product successfully'
                })
            }
        })
    })
};