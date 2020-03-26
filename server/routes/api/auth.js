const controller = require('../controller/auth-controller');
const productController = require('../controller/products-controller');
var router = require('express').Router();

router.post('/account/signup', controller.signup);
router.post('/account/signin', controller.signin);
router.get('/verify', controller.requireToken, controller.verify);
module.exports = router;