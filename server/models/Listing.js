const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {  
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    buyOrSell: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    aptSuite: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
      required: false,
    },
    bedroomCount: {
      type: Number,
      required: false,
    },
    bedCount: {
      type: Number,
      required: false,
    },
    bathroomCount: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
      default: [],
    },
    listingPhotos: [
      {
        data: Buffer, // Store binary image data
        contentType: String, // Store the MIME type of the image
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    highlight: {
      type: String,
      required: true,
    },
    highlightDesc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      required: false,
    },
    promoted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
