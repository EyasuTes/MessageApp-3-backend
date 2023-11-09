const mongoose = require("mongoose");

const contactModel = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    phone: { type: "String", require: true },
    name: { type: "String", unique: true },
    pic: {
      type: "String",
      // required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactModel);

module.exports = Contact;
