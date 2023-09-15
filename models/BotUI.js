const mongoose = require('mongoose')

const botUiSchema = mongoose.Schema({
    overallThemeUI: {
        theme: [{
            type: String,
            default: "#09215B",
        },
        {
            type: String,
            default: "#505050",
        },
        {
            type: String,
            default: "#FFFFFF",
        }
        ],
        botIcons: {
            type: String,
            default: "https://res.cloudinary.com/dqbub4vtj/image/upload/v1694672707/cqzu9muq7nesfcylx3w3.png"
        },
        actionButtonBorder: {
            type: String,
            default: "4px"
        }
    },
    conversationUI: {
        fontFamily: {
            type: String,
            default: "poppins"
        },
        conversationFontStyle: {
            type: String,
            default: "400"
        },
        timeStampFontStyle: {
            type: String,
            default: "500"
        },
        greetingMessage: {
            type: String,
            default: "👋 Greetings"
        },
    },
    cartUI: {
        imageBorderColor: {
            type: String,
            default: "#E6E6E6"
        },
        titleWeight: {
            type: String,
            default: "400"
        },
        titleColor: {
            type: String,
            default: "#000000"
        },
        priceWeight: {
            type: String,
            default: "500"
        },
        priceSize: {
            type: String,
            default: "12px"
        },
        priceColor: {
            type: String,
            default: "#000000"
        }
    },
    CatalogUI: {
        categoryBackDrop: {
            type: String,
            default: "linear-gradient(180deg,rgba(0,0,0,0)_0%,#000_126%)"
        },
        youMayLike: {
            imageBorderColor: {
                type: String,
                default: "none"
            },
            titleWeight: {
                type: String,
                default: "500"
            },
            titleColor: {
                type: String,
                default: "#000000"
            },
            priceWeight: {
                type: String,
                default: "500"
            },
            priceColor: {
                type: String,
                default: "#505050"
            }
        }
    },
    CategoriesUI: {
        quickReplyBorderRadius: {
            type: String,
            default: "1000px",
        },
        drawer: {
            imageBorderColor: {
                type: String,
                default: "#E6E6E6",
            },
            titleWeight: {
                type: String,
                default: "500",
            },
            titleColor: {
                type: String,
                default: "#000000",
            }
        }
    },
    clientName: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userEmail: {
        type: String,
    },
    isUpdated: {
        type: Boolean,
        default: false
    }
}, { versionKey: false, strict: false });

const BotUI = mongoose.model('BotUI', botUiSchema);
module.exports = { BotUI }; 