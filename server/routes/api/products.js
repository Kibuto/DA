const controller = require("../controller/products-controller");
const authController = require('../controller/auth-controller');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });
var router = require("express").Router();

router.get("/products", controller.index);
// router.post('/upload', controller.create);
// router.get('/open_image', controller.getImage);
router.post('/upload', upload.single('avatar'), controller.create);
router.get('/open_image', controller.getImage);

module.exports = router;
