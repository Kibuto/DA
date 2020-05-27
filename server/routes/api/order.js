const controller = require("../controller/order-controller");
const authController = require('../controller/auth-controller');
var router = require("express").Router();

router.post('/order/create', authController.requireToken, controller.create);
router.get('/order/getOrder', authController.requireToken, controller.getOrder);
router.put('/order/refuseOrder', authController.requireToken, controller.refuseOrder);
router.put('/order/checkOrder', authController.requireToken, controller.checkOrder);
module.exports = router;
