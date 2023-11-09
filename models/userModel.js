const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    phone: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    // pic: {
    //   type: "String",
    //   // required: true,
    //   default:
    //     "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    // },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  console.log(isMatch);
  return isMatch;
};
userSchema.pre("save", async function () {
  if (!this.isModified) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
