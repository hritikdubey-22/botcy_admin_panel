const response = require('../lib/responseLib');
const { constants, messages } = require("../constants.js");
const passwordUtil = require("../utils/password");

const { User } = require('../models/user');

const registration = async (req, res) => {
    try {
        const isUserExist = await User.findOne({ email: req.body.email });

        if (isUserExist) {
            const apiResponse = response.generate(
                constants.ERROR,
                messages.USER.ALREADYEXIST,
                constants.HTTP_SUCCESS
            );
            return res.send(apiResponse);
        }

        const user = new User(req.body);
        const result = await user.save();

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

const signUp = async (req, res) => {
    try {
        const isUserExist = await User.findOne({ email: req.body.email });

        if (isUserExist) {
            const apiResponse = response.generate(
                constants.ERROR,
                messages.USER.ALREADYEXIST,
                constants.HTTP_SUCCESS
            );
            return res.send(apiResponse);
        }

        // const user = new User(req.body);
        // const result = await user.save();
        const result = {otp:123456}
        const apiResponse = response.generate(
            constants.SUCCESS,
            messages.USER.GENERATED,
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }).select("+password");

        if (user && user.password && (await user.comparePassword(password))) {
            const resData = {
                token: passwordUtil.genJwtToken(user._id),
                user: user,
            };

            const apiResponse = response.generate(
                constants.SUCCESS,
                messages.LOGIN.SUCCESS,
                constants.HTTP_SUCCESS,
                resData
            );
            res.send(apiResponse);
        } else {
            const apiResponse = response.generate(
                constants.ERROR,
                messages.LOGIN.FAILURE,
                constants.HTTP_SERVER_ERROR
            );
            res.status(401).send(apiResponse);
        }
    } catch (error) {
        console.error(error);
        const apiResponse = response.generate(
            constants.ERROR,
            messages.LOGIN.FAILURE,
            constants.HTTP_SERVER_ERROR,
            error
        );
        res.status(500).send(apiResponse);
    }
};

module.exports = {
    registration: registration,
    login: login,
    signUp: signUp
};
