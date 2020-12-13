var mongoose = require("mongoose");
const uuid = require("uuid");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: String,
  name: String,
  email: String,
  age: Number,
});

UserSchema.pre("save", function (next) {
  const doc = this;
  if (doc.isNew) {
    doc._id = uuid.v1();
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
