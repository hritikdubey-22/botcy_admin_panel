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
        youmayLike: {
            imageBorderColor: {
                type: String,
            },
            titleWeight: {
                type: String,
            },
            titleColor: {
                type: String,
            },
            priceWeight: {
                type: String,
            },
            PriceColor: {
                type: String,
            }   
        }
    },
    CategoriesUI: {
        quickReplyBorderRadius: String,
        drawer: {
            imageBorderColor: {
                type: String,
            },
            titleWeight: {
                type: String,
            },
            titleColor: {
                type: String,
            }
        }
    },
    clientName: {
        type: String,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { versionKey: false, strict: false });

const BotUI = mongoose.model('BotUI', botUiSchema);
module.exports = { BotUI }; 