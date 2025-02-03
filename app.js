import express, { application } from "express";

// express app
const app = express();

// register view (template) engine
app.set("view engine", "ejs");

// listen for requests
app.listen(3000, "192.168.1.11");

// static files (css, js, images)
app.use(express.static("public"))

// routing

// logger
app.use((req, res, next) => {
  console.log("New request")
  console.log(req.hostname)
  console.log(req.method, req.url)
  next()
})

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
