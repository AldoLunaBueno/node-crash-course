import Blog from "../models/blogs.js"

const blog_index = (req, res) => {
    Blog.find()
      .then((result) => {
        res.render("blogs/index", {title: "All Blogs", blogs: result})
      })
      .catch((err) => {
        console.log(err)
      })
}

const blog_create_get = (req, res) => {
    res.render("blogs/create", { title: "New" });
}

const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
      .then((result) => {
        res.render("blogs/details", {title: "Details", blog: result})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const blog_delete = (req, res) => {
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
  }

  const blog_create_post = (req, res) => {
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
  }

  export {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
  }