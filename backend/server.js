let express = require("express")
let cors = require("cors")
let bodyParser = require("body-parser")
let app = express()

// We're going to store the uploaded file names in an array
// Usually they are stored in a database
let itemData = []

// You'll need the fs module
let fs = require("fs")

// You'll need to npm install multer
let multer = require("multer")
app.use(cors())

// You have to create the images subdirectory if it doesn't exist
// __dirname is the name of the directory where THIS FILE is located
let upload = multer({ dest: __dirname + "/images/" })

// Every file in ./images will become an endpoint
// This is useful for retrieving the images once they're stored
app.use(express.static(__dirname + "/images"))

// product-image matches the string in the frontend (can you find it?)
app.post("/addItem", upload.single("product-image"), (req, res) => {
  // A file is created in ./images. Go check it out!
  // Also, look at the output in the debug console

  console.log(req.file)
  // Multer generates a new random filename every time a file is uploaded
  console.log("new file location", req.file.path)

  // Get the extension of the file so we can rename it
  let extension = req.file.originalname.split(".").pop()

  // Rename the file so that it has the correct extension
  fs.rename(req.file.path, req.file.path + "." + extension, () => {})
  // req.body contains all the form data fields that are not files
  // In this case the only one is product-description
  console.log("body", req.body)
  // This is the data that needs to be stored
  let itemToStore = {
    path: "/" + req.file.filename + "." + extension,
    description: req.body.description
  }
  console.log("we are adding", itemToStore)
  // itemData needs to contain the file location and description
  itemData.push(itemToStore)
  console.log("updated itemData:", itemData)
  res.send(JSON.stringify(itemData))
})

// VERY IMPORTANT: Your multer endpoints MUST come BEFORE the following line
app.use(bodyParser.raw({ type: "*/*" }))

// VERY IMPORTANT: Your other endpoints MUST come AFTER the previous line

app.listen(4000)
