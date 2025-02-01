import express, { application } from "express"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// express app
const app = express()

// register view (template) engine
app.set("view engine", "ejs")

// listen for requests
app.listen(3000)

// routing

app.get("/",  (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname })
})

app.get("/about",  (req, res) => {
    res.sendFile("./views/about.html", { root: __dirname })
})

app.get("/about-us", (req, res) => {
    res.redirect("/about")
})

app.use((req, res) => {
    res.status(404).sendFile("./views/404.html", { root: __dirname })
})