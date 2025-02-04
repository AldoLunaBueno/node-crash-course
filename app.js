import express, { application } from "express";

import mongoose from "mongoose"
import Blog from "./models/blogs.js"

// Express:

// express app:
const app = express();

// listen for requests from LAN
app.listen(3000, "192.168.1.5");


// EJS:

// register view (template) engine
app.set("view engine", "ejs");


// MongoDB:

// Connecting to a MongoDB database (it doesn't need to exist previously)
mongoose.connect("mongodb://127.0.0.1:27017/albaxdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Logging db connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"))
db.once("open", () => {
  console.log("Connected to MongoDB")
})


// Middleware:

// handle post request body data
app.use(express.urlencoded({ extended: true }))

// static files exposed by express (css, js, images)
app.use(express.static("public"))

// logger
app.use((req, res, next) => {
  console.log("New request")
  console.log(req.hostname)
  console.log(req.method, req.url)
  next()
})

// Routing:

// // mongoose and mongo sandbox route
// app.get("/add-blog", async (req, res) => {
//   const newBlog = Blog({
//     title: "First Blog",
//     snippet: "This is a short description",
//     body: "This is the full content of the blog post."
//   })
//   try {    
//     await newBlog.save()
//     res.send("Blog added successfully")
//   } catch (error) {
//     res.status(500).send(error.message)
//   }
  
// })

// general routes

app.get("/", (req, res) => {
  // const blogs = [...];
  // res.render("index", { title: "All blogs", blogs });
  res.redirect("/blogs")
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// blog routes (CRUD)

// cRud
app.get("/blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("index", {title: "All Blogs", blogs: result})
    })
    .catch((err) => {
      console.log(err)
    })
})


// Crud?
app.get("/blog/create", (req, res) => {
  res.render("create", { title: "New" });
});

// cRud
app.get("/blog/:id", (req, res) => {
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
app.delete("/blog/:id", (req, res) => {
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
app.post("/blogs", (req, res) => {
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

app.use((req, res) => {
  res.status(404).render("404.ejs", { title: "Not Found" });
});
