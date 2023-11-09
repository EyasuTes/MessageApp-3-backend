const express = require("express");
const {
  addContact,
  getContacts,
  renameContact,
} = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, addContact);
router.route("/").get(protect, getContacts);
router.route("/").put(protect, renameContact);

module.exports = router;
