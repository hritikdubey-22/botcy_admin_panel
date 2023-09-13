const mongoose = require('mongoose')

const botUiSchema = mongoose.Schema({
    primaryThemeUI: {
        theme: {
            type: String,
        },
        botIcons: {
            type: String,
        },
        componentLayout: {
            type: String,
        }
    },
    conversationUI: {
        fontFamily: {
            type: String,
        },
        conversationFontStyle: {
            type: String,
        },
        timeStampFontStyle: {
            type: String,
        },
        greetingMessage: {
            type: String,
        },
    },
    cartUI: {
        type: String,
        required: true
    },
    CatalogUI: {
        type: String,
        default: false
    },
    CategoriesUI: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        default: false
    },
    email: {
        type: String,
        required: true
    },
});

const BotUI = mongoose.model('BotUI', botUiSchema);
module.exports = { BotUI }; 