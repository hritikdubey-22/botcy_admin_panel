const express = require("express");
const router = express.Router();
const indexController = require("../controller/user");
// const themeUI = require("../controller/customiseUi");



router.post('/signUp', indexController.signUp);
router.post('/forgotPassWord', indexController.forgotPassWord);
router.post('/registration', indexController.registration);
router.post('/login', indexController.login);
// router.post('/changeTheme', indexController.themeUI);



module.exports = router;