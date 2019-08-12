"use strict"; //For use with ES6

const mongoose = require('mongoose');
const userSchema = require('./User');
const chatSchema = require('./Chat');


const UserModel = mongoose.model('User', userSchema);
const ChatModel = mongoose.model('Chat', chatSchema);



module.exports = {
    UserModel,
    ChatModel
}
