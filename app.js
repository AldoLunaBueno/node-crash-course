import express, { application } from "express";

import mongoose from "mongoose"
import dotenv from "dotenv"
import blogRoutes from "./routes/blogRoutes.js"

// Load environment variables
dotenv.config();

// Express:

// express app:
const app = express();

// listen for requests from LAN
app.listen(3000, "0.0.0.0");


// EJS:

// register view (template) engine
app.set("view engine", "ejs");


// MongoDB:

const dbURI = process.env.MONGODB_URI

// Connecting to a MongoDB database (it doesn't need to exist previously)
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Logging db connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"))
db.once("open", () => {
  console.log("Connected to MongoDB Atlas")
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

// general routes

app.get("/", (req, res) => {
  res.redirect("/blogs")
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// CRUD blog routes (extracted)
app.use("/blogs", blogRoutes)

app.use((req, res) => {
  res.status(404).render("404.ejs", { title: "Not Found" });
});
