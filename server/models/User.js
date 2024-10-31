const mongoose = require("mongoose") ;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
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
      type:Array,
      default:[]
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", UserSchema)
module.exports = User