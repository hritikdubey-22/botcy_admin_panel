const express = require("express");
const router = express.Router();
const indexController = require("../controller/user");


router.post('/signup', indexController.registration);
router.post('/login', indexController.login);


module.exports = router;