const Product = require("../../models/product.model.js");
const checkProduct = require('../../models/checkProducts.model');
const multer  = require('multer');
const path = require('path');
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
        const { body, file, userId } = req;
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
            newProduct.price = price;
            newProduct.category = category;
            newProduct.images = [{url: `http://localhost:${process.env.PORT}/api/open_image?image_name=${file.filename}`}];
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
            // res.send({
            //     success: true,
            //     msg: 'Upload image successfully'
            // })
        }
    })
}

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