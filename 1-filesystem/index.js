// import greet from "./mymodule.js"

// greet("Aldo")


import * as fs from "fs"

// fs.readFile("./blog.txt", (err, data) => {
//     if (err) {
//         console.log(err)
//     }

//     console.log(data.toString())
// })

// console.log("last line")

if (!fs.existsSync("assets")) {
    fs.mkdir("assets", (err) => {
        console.log("folder created")
    })
} else {
    //console.log("folder already exists!")
    fs.rmdir("assets", () => {
        console.log("folder removed")
    })
}