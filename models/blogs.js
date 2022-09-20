const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creating schema
const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true } //automatically generates timestamps property and updates value
);

//creating model
const Blog = mongoose.model("Blog", blogSchema);
//model(name of collection in singuar form ,schema we want to base this model on)

module.exports = Blog;
