const multer = require("multer");
const cloudinary = require('cloudinary').v2;
var fs = require("fs");


// Configure Cloudinary with your API credentials
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});


async function uploadFileToCloudinary(fileBuffer, filename, folder = '') {
    return new Promise((resolve, reject) => {
        // Construct a unique public_id (optional) by combining folder and filename
        const public_id = folder ? `${folder}/${filename}` : filename;

        // Upload the file to Cloudinary
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto', // Automatically detect resource type
                public_id: public_id // Unique public ID (optional)
            },
            (error, result) => {
                if (error) {
                    console.error(error);
                    reject('Upload failed');
                } else {
                    // Return the uploaded URL
                    resolve(result.secure_url);
                }
            }
        ).end(fileBuffer);
    });
}

let uploadMultipleFile = (fieldname, count) => (req, res, next) => {
    upload.array(fieldname, count)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code == 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({ error: "Too many files selected. Maximum allowed: 5." });
            } else {
                return res.status(400).json({ error: "error occure in multer" });
            }
        } else if (err) {
            return res.status(400).json({ error: "unknown error occure!" });
        }
        next();
    });
}

const upload = multer({ storage: multer.memoryStorage() });

module.exports = { upload, uploadMultipleFile };