const response = require('../lib/responseLib');
const { constants, messages } = require("../constants.js");
const passwordUtil = require("../utils/password");
const { uploadFileToCloudinary } = require("../middleware/multer")

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
        const path = req?.file?.path ?? "";
        // const link = await uploadFileToCloudinary(path);
        let link = "https://res.cloudinary.com/dqbub4vtj/image/upload/v1694672707/cqzu9muq7nesfcylx3w3.png";

        let userObject = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            profileImage: link,
            clientName: req.body.clientName
        }
        const result = await User.create(userObject);
        result._doc.token = passwordUtil.genJwtToken(result._id);
        delete result._doc.password;
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
                constants.HTTP_ERROR
            );
            return res.send(apiResponse);
        }

        const result = { otp: 123456, email: req.body.email }
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

const forgotPassWord = async (req, res) => {
    try {
        const isUserExist = await User.findOne({ email: req.body.email });

        if (!isUserExist) {
            const apiResponse = response.generate(
                constants.ERROR,
                messages.USER.NOTEXIST,
                constants.HTTP_SUCCESS
            );
            return res.send(apiResponse);
        }

        const result = { otp: 123456 }
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
            delete resData.user._doc.password;
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
    registration,
    login,
    signUp,
    forgotPassWord
};
