import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IApplicationAuthorData from './IApplicationAuthorData';

class App extends Component<IApplicationAuthorData, {}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. The author of this application is {this.props.FirstName} {this.props.Surname} and is aged {this.props.Age}. Their 
            repository can be found here {this.props.RepositoryUrl}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
