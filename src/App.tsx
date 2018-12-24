import React, { Component } from 'react';
import './App.css';
import CreateUserForm from "./CreateUser/CreateUserForm";

class App extends Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <CreateUserForm/>
      </div>
    );
  }
}

export default App;
