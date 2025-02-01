import * as http from "http"
import * as fs from "fs"

const server = http.createServer((req, res) => {
    console.log("request made")
    res.setHeader("Content-Type", "text/html")
    console.log(req.url, req.method)
    let path = "./2-server/views/"
    switch(req.url) {
        case "/":
            path += "index.html"
            res.statusCode = 200
            break
        case "/about":
            path += "about.html"
            res.statusCode = 200
            break
        default:
            path += "404.html"
            res.statusCode = 404
            break
    }
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            res.end(data)
        }
    })
})

server.listen("3000", "localhost", () => {
    console.log("listening")
})

