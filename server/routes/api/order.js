const controller = require("../controller/order-controller");
const authController = require('../controller/auth-controller');
var router = require("express").Router();

router.post('/order/create', authController.requireToken, controller.create);
router.get('/order/getOrder', authController.requireToken, controller.getOrder);
// router.put('/refuseProduct', authController.requireToken, controller.refuseProduct);
// router.get('/notifications', authController.requireToken, controller.notifications);
// router.put('/checkNotification', authController.requireToken, controller.checkNotifications);
module.exports = router;
