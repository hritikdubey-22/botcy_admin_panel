const multer = require("multer");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dqbub4vtj',
    api_key: '872533152418616',
    api_secret: 'DDN-V8-KrKLBe_Bf7tYGR3u3Yn0'
});


async function uploadFileToCloudinary(file) {
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type: 'auto'
        });
        const url = `${result.secure_url}?response-content-disposition=inline`;
        return url;
    } catch (error) {
        console.error('Cloudinary error:', error);
        throw error;
    }
}


let storage = multer.diskStorage({
    // destination: function (req, file, callback) {
    //     console.log("file", file);
    //  callback(null, "./Uploads/");
    // },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
let maxSize = 1000000 * 1000;
let multerUpload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    }
});
const single = multerUpload.single('image')

module.exports = { single, uploadFileToCloudinary };