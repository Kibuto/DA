const controller = require('../controller/auth-controller');
var router = require('express').Router();

router.post('/account/signup', controller.signup);
router.post('/account/signin', controller.signin);
router.get('/account/getInfo', controller.requireToken, controller.getInfo);
router.get('/verify', controller.requireToken, controller.verify);
module.exports = router;