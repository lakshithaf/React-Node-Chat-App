"use strict";

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const ChatController = require('../controllers/chatController');

// router.get('/', asyncHandler(async (req, res) => {
//     return ChatController.getAllChats(req, res);
// }));

module.exports = router;