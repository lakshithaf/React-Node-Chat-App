"use strict"; //For use with ES6

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chat: String,
    user: String,
    is_group: Boolean,
    group_id: String,
    viewed_by: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });

module.exports = chatSchema;