import express, { application } from "express";
import mongoose from "mongoose"

// Express:

// express app:
const app = express();

// listen for requests from LAN
app.listen(3000, "192.168.1.11");


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

// Defining Schema
const blogSchema = new mongoose.Schema({
  title: {type: String, required: true},
  snippet: {type: String, required: true},
  body: {type: String, required: true}
})

// Create Model based on Schema
const Blog = mongoose.model("Blog", blogSchema)


// Exposed by express:

// static files (css, js, images)
app.use(express.static("public"))


// Routing:

// logger
app.use((req, res, next) => {
  console.log("New request")
  console.log(req.hostname)
  console.log(req.method, req.url)
  next()
})

// mongoose and mongo sandbox routes

app.get("/add-blog", async (req, res) => {
  const newBlog = Blog({
    title: "First Blog",
    snippet: "This is a short description",
    body: "This is the full content of the blog post."
  })
  try {    
    await newBlog.save()
    res.send("Blog added successfully")
  } catch (error) {
    res.status(500).send(error.message)
  }
  
})

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

// real routes

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Senku's sextant",
      snippet:
        "This ingenius artifact can let you measure vertical angles with your eyes.",
    },
    {
      title: "Gojo's Limitless Course Technique",
      snippet: "This stuning technique is based on maths",
    },
    {
      title: "Blah blah",
      snippet: "Blah blah blah blah blah",
    },
    {
      title: "Senku's sextant",
      snippet:
        "This ingenius artifact can let you measure vertical angles with your eyes.",
    },
    {
      title: "Gojo's Limitless Course Technique",
      snippet: "This stuning technique is based on maths",
    },
    {
      title: "Blah blah",
      snippet: "Blah blah blah blah blah",
    },
  ];

  res.render("index", { title: "Home", blogs });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).render("404.ejs", { title: "Not Found" });
});
