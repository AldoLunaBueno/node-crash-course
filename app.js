import express, { application } from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import blogRoutes from "./routes/blogRoutes.js"
import cors from "cors"

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

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

// Express
const app = express(); // express app
app.listen(3000, "0.0.0.0"); // listen for requests from LAN

// EJS
app.set("view engine", "ejs"); // register view (template) engine

// Cors
app.use(cors({
  origin: ["https://node-crash-course-nu.vercel.app/"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}))
app.use(express.json())

// Middleware

app.use(express.urlencoded({ extended: true })) // handle post request body data
app.use(express.static("public")) // static files exposed by express (css, js, images)
app.set("views", path.join(__dirname, "views"));

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

// Export the app for Vercel
export default app;