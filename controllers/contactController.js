const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Contact = require("../models/contactModel");

const addContact = asyncHandler(async (req, res) => {
  try {
    const { phone, contactName } = req.body;
    const createContact = await Contact.create({
      name: contactName,
      user: req.user._id,
      phone: phone,
    });
    const FullContact = await Contact.findOne({
      _id: createContact._id,
    });
    //revise
    res.status(200).json(FullContact);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const getContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const renameContact = asyncHandler(async (req, res) => {
  const { phone, name } = req.body;

  const contact = await Contact.findOne({ phone: phone });
  console.log(contact);
  if (contact) {
    contact.name = name;
    await contact.save();
    res.status(200).json(contact);
  }
  res.status(400).json({ error: "contact not found" });
});

module.exports = { addContact, getContacts, renameContact };
