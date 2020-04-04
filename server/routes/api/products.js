const controller = require("../controller/products-controller");
const authController = require('../controller/auth-controller');
var router = require("express").Router();

router.post("/products", controller.index);
// router.post('/upload', controller.create);
// router.get('/open_image', controller.getImage);
router.post('/upload', authController.requireToken, controller.create);
router.get('/open_image', controller.getImage);
router.get('/getProduct', authController.requireToken, controller.getProduct);
router.put('/checkProduct', authController.requireToken, controller.checkProduct);
router.get('/notifications', authController.requireToken, controller.notifications);
router.put('/checkNotification', authController.requireToken, controller.checkNotifications);
module.exports = router;
