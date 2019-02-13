import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.state = {
      selectedFile: undefined
    }
  }
  changeHandler(event) {
    let file = event.target.files[0]
    this.setState({ selectedFile: file })
  }
  submitHandler(event) {
    event.preventDefault()
    fetch("http://localhost:5050/upload", {
      body: this.state.selectedFile,
      method: "POST",
      headers: { sessionID: "1234" }
    })
  }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input type="file" onChange={this.changeHandler} />
        <input type="submit" />
      </form>
    )
  }
}

export default App
