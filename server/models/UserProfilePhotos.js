const mongoose = require('mongoose')

const UserProfileImagesSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model
        required: true,
        unique: true, // Each user can have only one profile image
      },
      profileImage: {
        data: Buffer, // Store binary data
        contentType: String, // MIME type of the file (e.g., "image/jpeg")
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );
  
  const UserProfileImages = mongoose.model("UserProfileImages", UserProfileImagesSchema);
  
  module.exports = UserProfileImages;