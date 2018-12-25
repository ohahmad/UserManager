import React, { Component } from 'react';
import './App.css';
import CreateUserForm from "./CreateUser/CreateUserForm";
import Header from './Header/Header';

class App extends Component<{}, {}> {
  render() {
    return (
      <div className="app">
        <Header name ="Ommer"></Header>
        <CreateUserForm/>
      </div>
    );
  }
}

export default App;
