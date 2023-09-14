const response = require('../lib/responseLib');
const { constants, messages } = require("../constants.js");
const { User } = require('../models/user');
const { BotUI } = require('../models/BotUI');
const { uploadFileToCloudinary } = require("../middleware/multer")


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
        const { path } = req.file;
        let link;
        let changedUI;
        if (path) {
            // link = await uploadFileToCloudinary(path);
            link = "https://res.cloudinary.com/dqbub4vtj/image/upload/v1694672707/cqzu9muq7nesfcylx3w3.png";
            console.log(link)
        }
        if (isUserExist.cutomiseBotUiId) {
            if (req.body.sectionChanged == "overallThemeUI") {
                changes.botIcons = link;
                changedUI = await BotUI.findByIdAndUpdate({ _id: isUserExist.cutomiseBotUiId }, { overallThemeUI: changes }, { new: true });
            }
            else if (req.body.sectionChanged == "conversationUI") {
                changedUI = await BotUI.findByIdAndUpdate({ _id: isUserExist.cutomiseBotUiId }, { conversationUI: changes }, { new: true });
            }
            else if (req.body.sectionChanged == "cartUI") {
                changedUI = await BotUI.findByIdAndUpdate({ _id: isUserExist.cutomiseBotUiId }, { cartUI: changes }, { new: true });
            }
            else if (req.body.sectionChanged == "CatalogUI") {
                changedUI = await BotUI.findByIdAndUpdate({ _id: isUserExist.cutomiseBotUiId }, { CatalogUI: changes }, { new: true });
            }
            else if (req.body.sectionChanged == "CategoriesUI") {
                changedUI = await BotUI.findByIdAndUpdate({ _id: isUserExist.cutomiseBotUiId }, { CategoriesUI: changes }, { new: true });
            }
        }
        else {
            let saveToObject = {
                [req.body.sectionChanged]: {
                    theme: changes.theme,
                    botIcons: link,
                    actionButtonBorder: changes.actionButtonBorder,
                },
                userId: isUserExist._id
            }
            changedUI = await BotUI.create(saveToObject);
            await User.findByIdAndUpdate({ _id: isUserExist._id }, { cutomiseBotUiId: changedUI._id }, { new: true });
        }
        const apiResponse = response.generate(
            constants.SUCCESS,
            messages.USER.SUCCESS,
            constants.HTTP_SUCCESS,
            changedUI
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