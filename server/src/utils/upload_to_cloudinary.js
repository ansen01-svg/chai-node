const cloudinary = require("cloudinary").v2();
const fs = require("node:fs");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadToCloudinary = async (localImageAddress) => {
  try {
    if (!localImageAddress) return null;

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(localImageAddress, {
        resource_type: "auto",
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(uploadResult);
    fs.unlinkSync(localImageAddress);

    return uploadResult;
  } catch (error) {
    console.log("Error uploading file to cloudinary", error);
    fs.unlinkSync(localImageAddress);
    return null;
  }
};

module.exports = uploadToCloudinary;
