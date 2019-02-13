let express = require("express")
let cors = require("cors")
let bodyParser = require("body-parser")

// You'll need to npm install multer
let multer = require("multer")
let app = express()
app.use(cors())

// You have to create the images subdirectory
var upload = multer({ dest: "./images/" })

// Every file in ./images will become an endpoint
// This is useful for retrieving the images once they're stored
app.use(express.static("./images"))

// product-image matches the string in the frontend (can you find it?)
app.post("/addItem", upload.single("product-image"), (req, res) => {
  // A file is created in ./images. Go check it out!
  // Also, look at the output in the debug console
  console.log("file", req.file)
  console.log("body", req.body)
  res.send(JSON.stringify({ success: true }))
})

// Your multer endpoints MUST come BEFORE the following line
app.use(bodyParser.raw({ type: "*/*" }))

// Your other endpoints MUST come AFTER the previous line

app.listen(4000)
