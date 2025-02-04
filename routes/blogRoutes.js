import express from "express"
import Blog from "../models/blogs.js"

const router = express.Router()

// cRud
router.get("/", (req, res) => {
    Blog.find()
      .then((result) => {
        res.render("index", {title: "All Blogs", blogs: result})
      })
      .catch((err) => {
        console.log(err)
      })
  })
  
  
  // Crud?
  router.get("/create", (req, res) => {
    res.render("create", { title: "New" });
  });
  
  // cRud
  router.get("/:id", (req, res) => {
    const id = req.params.id
    Blog.findById(id)
      .then((result) => {
        res.render("details", {title: "Details", blog: result})
      })
      .catch((err) => {
        console.log(err)
      })
  })
  
  // cruD
  router.delete("/:id", (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
      .then((result) => {
        console.log("Delete blog:")
        console.log(result)
        // res.redirect("/blogs")DOESN'T WORK!
        res.json({message: "Blog deleted!"})
      })
      .catch((err) => {
          console.log(err)
      })
  })
  
  // Crud
  router.post("/", (req, res) => {
    const newBlog = Blog(req.body)
    newBlog.save()
      .then((result) => {
        console.log("Blog added successfully!")
        console.log(result)
        res.redirect("/blogs/create")
      })
      .catch((err) => {
        console.log(err)
      })
  })

  export default router