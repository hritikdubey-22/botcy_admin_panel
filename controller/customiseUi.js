const response = require('../lib/responseLib');
const { constants, messages } = require("../constants.js");
const { User } = require('../models/user');
const { BotUI } = require('../models/BotUI');
const { uploadFileToCloudinary } = require("../middleware/multer")
const axios = require('axios');


const themeCustomization = async (req, res) => {
    try {
        let changes = JSON.parse(req.body.changes);
        const isUserExist = await User.findOne({ email: req.body.email }).lean();

        if (!isUserExist) {
            const apiResponse = response.generate(
                constants.ERROR,
                messages.USER.NOTEXIST,
                constants.HTTP_SUCCESS
            );
            return res.send(apiResponse);
        }
        const path = req?.file?.path ?? "";
        let link;
        let changedUI;
        if (path) {
            link = await uploadFileToCloudinary(path);
            console.log(link)
        }
        if (isUserExist.cutomiseBotUiId) {
            if (req.body.sectionChanged == "overallThemeUI") {
                const existingUI = await BotUI.findById(isUserExist.cutomiseBotUiId).lean();
                let toUpdateObject = {
                    theme: changes.theme ?? existingUI.overallThemeUI.theme,
                    actionButtonBorder: changes.actionButtonBorder ?? existingUI.overallThemeUI.actionButtonBorder,
                    botIcons: link ?? existingUI.overallThemeUI.botIcons
                }
                changedUI = await BotUI.findByIdAndUpdate({ _id: isUserExist.cutomiseBotUiId }, { overallThemeUI: toUpdateObject, isUpdated :true }, { new: true });
            }
            else if (req.body.sectionChanged == "conversationUI") {
                changedUI = await BotUI.findByIdAndUpdate({ _id: isUserExist.cutomiseBotUiId }, { conversationUI: changes, isUpdated: true }, { new: true });
            }
            else if (req.body.sectionChanged == "cartUI") {
                changedUI = await BotUI.findByIdAndUpdate({ _id: isUserExist.cutomiseBotUiId }, { cartUI: changes, isUpdated: true }, { new: true });
            }
            else if (req.body.sectionChanged == "CatalogUI") {
                changedUI = await BotUI.findByIdAndUpdate({ _id: isUserExist.cutomiseBotUiId }, { CatalogUI: changes, isUpdated: true }, { new: true });
            }
            else if (req.body.sectionChanged == "CategoriesUI") {
                changedUI = await BotUI.findByIdAndUpdate({ _id: isUserExist.cutomiseBotUiId }, { CategoriesUI: changes, isUpdated: true }, { new: true });
            }
        }
        else {
            let saveToObject = {
                [req.body.sectionChanged]: {
                    theme: changes.theme,
                    botIcons: link,
                    actionButtonBorder: changes.actionButtonBorder,
                },
                userId: isUserExist._id,
                userEmail: isUserExist.email,
                isUpdated: true
            }
            changedUI = await BotUI.create(saveToObject);
            await User.findByIdAndUpdate({ _id: isUserExist._id }, { cutomiseBotUiId: changedUI._id }, { new: true });
        }
        const apiResponse = response.generate(
            constants.SUCCESS,
            messages.BOTUI.SUCCESS,
            constants.HTTP_SUCCESS,
            changedUI
        );
        await axios({
            method: 'post',
            url: "https://ecommerce-direct-line.gloryautotech.com/polyline/updatedUI",
            data: {}
        });
        res.send(apiResponse);
    } catch (error) {
        console.error(error);
        const apiResponse = response.generate(
            constants.ERROR,
            messages.BOTUI.FAILURE,
            constants.HTTP_SERVER_ERROR,
            error
        );
        res.status(500).send(apiResponse);
    }
};

const getTheme = async (req, res) => {
    try {
        let email = req.body.email ?? " "
        let clientName = req.body.clientName ?? " "
        const userTheme = await BotUI.findOne({ $or: [{ userEmail: email }, { clientName: clientName }] }).lean();
        const apiResponse = response.generate(
            constants.SUCCESS,
            messages.BOTUI.FETCHED,
            constants.HTTP_SUCCESS,
            userTheme
        );
        res.send(apiResponse);
    } catch (error) {
        console.error(error);
        const apiResponse = response.generate(
            constants.ERROR,
            messages.BOTUI.FAILURE,
            constants.HTTP_SERVER_ERROR,
            error
        );
        res.status(500).send(apiResponse);
    }
}

module.exports = {
    themeCustomization,
    getTheme
}