const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({ 
  title: String,
  images: { type: Array },
  createdBy: { type: ObjectId }
});

const UserModel = mongoose.model('User', schema);

module.exports = UserModel;