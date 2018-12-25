import React, { Component } from 'react';
import './App.scss';
import CreateUserForm from "./createUser/CreateUserForm";
import Header from './header/Header';
import Footer from './footer/Footer';

class App extends Component<{}, {}> {
  render() {
    return (
      <div className="app">
        <Header name ="Ommer"></Header>
        <div className="content">
          <main className="contentMain">            
            <CreateUserForm/>
          </main>
          <aside className="contentSidebar contentSidebarLeft">
            <h2>Left Sidebar</h2>
            <p>Put your content here</p>
          </aside>
          <aside className="contentSidebar contentSidebarRight">
              <h2>Right Sidebar</h2>
              <p>Put your content here</p>
          </aside>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
