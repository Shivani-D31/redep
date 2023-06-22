const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  title: String,
  blog: String,
  userID: String,
  Id: Number,
});

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = { BlogModel };
