const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/").get(protect, allUsers);

router.post("/login", authUser);

module.exports = router;
