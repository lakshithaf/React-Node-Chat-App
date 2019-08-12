"use strict"; //For use with ES6

const mongoose = require('mongoose');
const cipherService = require ('../utils/cipherService');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, requird: true},
    email: { type: String, lowercase: true, requird: true, unique: true },
    password: { type: String, requird: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });


UserSchema.pre('save', function(next) {
  if ( this.password && this.isModified('password') ) {
    this.password = cipherService.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
 }

module.exports = UserSchema;