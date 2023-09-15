const express = require("express");
const router = express.Router();
const indexController = require("../controller/user");
const themeUI = require("../controller/customiseUi");
const { single } = require("../middleware/multer")
const { verifyJwtToken } = require("../utils/password")



router.post('/signUp', indexController.signUp);
router.post('/forgotPassWord', indexController.forgotPassWord);
router.post('/registration', single, indexController.registration);
router.post('/login', indexController.login);
router.post('/changeTheme', verifyJwtToken, single, themeUI.themeCustomization);
router.post('/getTheme', verifyJwtToken, themeUI.getTheme);




module.exports = router;