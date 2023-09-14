const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your API credentials
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});


async function uploadFileToCloudinary(fileBuffer, filename, folder = '') {
    return new Promise(async (resolve, reject) => {
        try {
            // Construct a unique public_id (optional) by combining folder and filename
            const public_id = folder ? `${folder}/${filename}` : filename;

            // Upload the file to Cloudinary
            const result = await cloudinary.uploader.upload(fileBuffer, {
                resource_type: 'auto', // Automatically detect resource type
                public_id: public_id // Unique public ID (optional)
            });

            // Return the uploaded URL
            resolve(result.secure_url);
        } catch (error) {
            console.error(error);
            reject('Upload failed');
        }
    });
}

// Example usage:
// const fs = require('fs');
// const fileBuffer = fs.readFileSync('path_to_your_file.jpg');
// const filename = 'your_file.jpg';
// const folder = 'optional_folder_name';

// (async () => {
//   try {
//     const url = await uploadFileToCloudinary(fileBuffer, filename, folder);
//     console.log(`File uploaded to Cloudinary. URL: ${url}`);
//   } catch (error) {
//     console.error(error);
//   }
// })();

module.exports = uploadFileToCloudinary;
