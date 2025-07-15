const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  try {
    // Determine resource_type based on MIME type
    let resourceType = 'auto';

    if (file.mimetype.startsWith('video/')) {
      resourceType = 'video'; // Needed to extract duration
    }

    const options = {
      folder,
      resource_type: resourceType,
    };

    if (height) options.height = height;
    if (quality) options.quality = quality;

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;

  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};
