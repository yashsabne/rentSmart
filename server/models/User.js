const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Don't forget to import bcrypt if you're using it for hashing

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    resetToken: String,
    resetTokenExpiry: Date,
    profileImagePath: {
      type: String,
      default: "",
    },
    propertyList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
    savedProperties: {
      type: Array,
      default: [],
    },
    premiumMember: {
      type: Boolean,
      default: false,
    },
    totalEmailReqSent: {
      type: Number,
      default: 0,
    },
    lastEmailReqReset: {
      type: Date,
      default: Date.now,
    },
    totalNumberReveal: {
      type: Number,
      default: 0,
    },
    lastNumberReveal: {
      type: Date,
      default: Date.now,
    },
    googleId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Method to hash the user's password
UserSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

// Method to increment email requests and handle reset
UserSchema.methods.incrementEmailReqSent = async function () {
  const now = new Date();
  const lastReset = new Date(this.lastEmailReqReset);

  // Check if the current date is in a new month relative to the last reset date
  if (
    now.getFullYear() > lastReset.getFullYear() ||
    (now.getFullYear() === lastReset.getFullYear() && now.getMonth() > lastReset.getMonth())
  ) {
    // Reset count for a new month
    this.totalEmailReqSent = 1;
    this.lastEmailReqReset = now;
    await this.save();
    return true;
  }

  // If the month hasn't changed, check if the user has reached their limit
  if (this.totalEmailReqSent < 5) {
    this.totalEmailReqSent += 1;
    await this.save();
    return true;
  } else {
    // Throw an error when the limit is reached
    throw new Error("Email request limit reached.");
  }
};

// Method to increment the number of contact reveals and handle reset
UserSchema.methods.incrementNumberReveal = async function () {
  const now = new Date();
  const lastReset = new Date(this.lastNumberReveal);

  // Check if the current date is in a new month relative to the last reset date
  if (
    now.getFullYear() > lastReset.getFullYear() ||
    (now.getFullYear() === lastReset.getFullYear() && now.getMonth() > lastReset.getMonth())
  ) {
    // Reset count for a new month
    this.totalNumberReveal = 1;
    this.lastNumberReveal = now;
    await this.save();
    return true;
  }

  // If the month hasn't changed, check if the user has reached their limit
  if (this.totalNumberReveal < 2) {
    this.totalNumberReveal += 1;
    await this.save();
    return true;
  } else {
    // Throw an error when the limit is reached
    throw new Error("Contact reveal limit reached.");
  }
};

UserSchema.methods.hasReachedContactRevealLimit = function () {
  return this.totalNumberReveal >= 2; // Assuming the limit is 2
};


// Export the User model
const User = mongoose.model("User", UserSchema);
module.exports = User;
