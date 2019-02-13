let express = require("express")
let cors = require("cors")
let bodyParser = require("body-parser")
let app = express()

// You'll need to npm install multer
let multer = require("multer")
app.use(cors())

// You have to create the images subdirectory if it doesn't exist
// __dirname is the name of the directory where THIS FILE is located
var upload = multer({ dest: __dirname + "/images/" })

// Every file in ./images will become an endpoint
// This is useful for retrieving the images once they're stored
app.use(express.static(__dirname + "/images"))

// product-image matches the string in the frontend (can you find it?)
app.post("/addItem", upload.single("product-image"), (req, res) => {
  // A file is created in ./images. Go check it out!
  // Also, look at the output in the debug console
  console.log("file", req.file)
  console.log("body", req.body)
  res.send(JSON.stringify({ success: true }))
})

// VERY IMPORTANT: Your multer endpoints MUST come BEFORE the following line
app.use(bodyParser.raw({ type: "*/*" }))

// VERY IMPORTANT: Your other endpoints MUST come AFTER the previous line

app.listen(4000)
