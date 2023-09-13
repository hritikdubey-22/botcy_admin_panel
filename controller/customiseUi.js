const response = require('../lib/responseLib');
const { constants, messages } = require("../constants.js");
const { User } = require('../models/user');
const { BotUI } = require('../models/BotUI');


const themeCustomization = async (req, res) => {
    try {
        const isUserExist = await User.findOne({ email: req.body.email, admin:true });

        if (isUserExist) {
            const apiResponse = response.generate(
                constants.ERROR,
                messages.USER.ALREADYEXIST,
                constants.HTTP_SUCCESS
            );
            return res.send(apiResponse);
        }
        
        

        const apiResponse = response.generate(
            constants.SUCCESS,
            messages.USER.SUCCESS,
            constants.HTTP_SUCCESS,
            result
        );
        res.send(apiResponse);
    } catch (error) {
        console.error(error);
        const apiResponse = response.generate(
            constants.ERROR,
            messages.USER.FAILURE,
            constants.HTTP_SERVER_ERROR,
            error
        );
        res.status(500).send(apiResponse);
    }
};

module.exports = {
    themeCustomization
}