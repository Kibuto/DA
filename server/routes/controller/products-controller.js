const Product = require("../../models/product.model.js");

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

// module.exports.create = async (req, res, next) => {
//     let formidable = require('formidable');
//     let form = new formidable.IncomingForm();
//     const filetypes = /jpeg|jpg|png|svg/;
//     form.uploadDir = global.__project_dirname + '../../uploads';
//     form.keepExtensions = true;
//     form.maxFileSize = 5*1024*1024;
//     form.parse(req, (err, fields, files) => {
//         if(err) {
//             res.send({
//                 success: false,
//                 message: 'Error: Cannot upload image'
//             })
//         }
//         console.log(files);
//         let fileName = files.avatar.path.split('\\')[1].split('.');;
//         if(files.avatar.path && filetypes.test(fileName[1])) {
//             res.send({
//                 success: true,
//                 message: 'Upload images successfully'
//             });
//         }
//         else {
//             res.send({
//                 success: false,
//                 message: 'No images to upload!'
//             })
//         }
//     })
//     // const userId = req.userId;
//     // console.log(userId);
//     // if(userId) {
        
//     // }
//     // else {
//     //     res.send({
//     //         success: false,
//     //         message: 'You must login'
//     //     })
//     // }
// };

// module.exports.getImage = async (req, res, next) => {
//     let imageName = 'uploads/' + req.query.image_name;
//     fs.readFile(imageName, (err, imageData) => {
//         if(err) {
//             res.send({
//                 success: false,
//                 message: `Can't read image ${err}`
//             });
//             return;
//         }
//         res.writeHead(200, {'Content-Type': 'image/jpeg'});
//         res.end(imageData);
//     })
// };

module.exports.create = (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    const filetypes = /jpeg|jpg|png|svg/;
    const filename = req.file.originalname;
    if(filetypes.test(filename)) {
        res.send({
            success: true,
            message: 'Upload image successfully'
        })
    }
    else {
        res.send({
            success: false,
            message: 'No image upload'
        })
    }
    
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