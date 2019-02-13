import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.fileChangeHandler = this.fileChangeHandler.bind(this)
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.state = {
      selectedFile: undefined, // The file that the user will selected
      description: "" // the user can also
    }
  }
  fileChangeHandler(event) {
    let file = event.target.files[0]
    // Store the file in the state so that you can use it in the submit
    this.setState({ selectedFile: file })
  }
  descriptionChangeHandler(event) {
    this.setState({ description: event.target.value })
  }
  submitHandler(event) {
    event.preventDefault()

    let formData = new FormData()
    // product-image matches the string in the backend (can you find it?)
    formData.append("product-image", this.state.selectedFile)
    // The description will be in the req.body of the backend
    formData.append("description", this.state.description)

    formData.append("sessionId", "13451")
    fetch("http://localhost:4000/addItem", {
      body: formData,
      method: "POST"
    })
  }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input type="file" onChange={this.fileChangeHandler} />
        <input type="text" onChange={this.descriptionChangeHandler} />
        <input type="submit" />
      </form>
    )
  }
}

export default App
