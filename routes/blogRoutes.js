import express from "express"
import Blog from "../models/blogs.js"

const router = express.Router()

// cRud
router.get("/blogs", (req, res) => {
    Blog.find()
      .then((result) => {
        res.render("index", {title: "All Blogs", blogs: result})
      })
      .catch((err) => {
        console.log(err)
      })
  })
  
  
  // Crud?
  router.get("/blog/create", (req, res) => {
    res.render("create", { title: "New" });
  });
  
  // cRud
  router.get("/blog/:id", (req, res) => {
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
  router.delete("/blog/:id", (req, res) => {
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
  router.post("/blogs", (req, res) => {
    const newBlog = Blog(req.body)
    newBlog.save()
      .then((result) => {
        console.log("Blog added successfully!")
        console.log(result)
        res.redirect("/blog/create")
      })
      .catch((err) => {
        console.log(err)
      })
  })

  export default router