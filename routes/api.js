const express = require("express");
const router = express.Router();
const indexController = require("../controller/user");
const themeUI = require("../controller/customiseUi");
const {single} = require("../middleware/multer")



router.post('/signUp', indexController.signUp);
router.post('/forgotPassWord', indexController.forgotPassWord);
router.post('/registration', single, indexController.registration);
router.post('/login', indexController.login);
router.post('/changeTheme', single, themeUI.themeCustomization);



module.exports = router;