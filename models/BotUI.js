const mongoose = require('mongoose')

const botUiSchema = mongoose.Schema({
    overallThemeUI: {
        theme: {
            type: String,
        },
        botIcons: {
            type: String,
        },
        actionButtonBorder: {
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
            isEmoji: {
                type: Boolean,
            },
            emojiPlace: {
                type: String,
            }
        },
    },
    cartUI: {
        imageBorderColor: {
            type: String,
        },
        titleWeight: {
            type: String,
        },
        priceWeight: {
            type: String,
        },
        PriceSize: {
            type: String,
        }
    },
    CatalogUI: {
        categoryBackDrop: String,
    },
    CategoriesUI: {
        type: String,
        default: false
    },
    clientName: {
        type: String,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    email: {
        type: String,
        ref: "User"
    },
}, { versionKey: false, strict: false });

const BotUI = mongoose.model('BotUI', botUiSchema);
module.exports = { BotUI }; 