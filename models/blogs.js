import mongoose from "mongoose"

// Defining Schema
const blogSchema = new mongoose.Schema({
  title: {type: String, required: true},
  snippet: {type: String, required: true},
  body: {type: String, required: true}
})

// Create Model based on Schema
const Blog = mongoose.model("Blog", blogSchema)

export default Blog