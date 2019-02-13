let express = require("express")
let cors = require("cors")
let bodyParser = require("body-parser")
let fs = require("fs")
let app = express()
app.use(express.static("images"))

app.use(bodyParser.raw({ limit: "10mb", type: "*/*" }))
app.use(cors())

let counter = 0
let getId = function() {
  counter++
  return "image" + counter
}

app.post("/upload", (req, res) => {
  let extension = req.headers.content - type.split("/")[1]
  let path = "/images/" + getId() + "." + extension
  fs.writeFileSync("." + path, req.body)
  // store the path somewhere
})
app.listen(5050)
