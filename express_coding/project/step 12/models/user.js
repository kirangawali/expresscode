var express = require('express');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
 

const userSchema = mongoose.Schema({
  userName: { type: String, required: true  },
  loginName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  userType: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  address: { type: String, required: true }
});
 
module.exports = mongoose.model("tbl_user_basic_data", userSchema);