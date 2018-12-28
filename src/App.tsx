import React, { Component } from 'react';
import './App.scss';
import CreateUserFormWrapper from "./createUser/CreateUserFormWrapper";
import Header from './header/Header';
import Footer from './footer/Footer';
import ViewUsers from './viewUsers/ViewUsers';
import UserContext from './UsersContext'
import IUser from './createUser/interface/IUser';

interface IAppState {
  onUserCreated:  (user: IUser) => void;
  users: IUser[];
}

class App extends Component<{}, IAppState> {
  constructor(props : {}) {
    super(props);

    const onUserCreated = (user: IUser) => {
      this.setState(previousState => ({
          users: [user, ...previousState.users]
      }));
    };

    this.state = {
      users: [],
      onUserCreated: onUserCreated,
    };
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <div className="app">
          <Header name="Ommer"></Header>
          <div className="content">
            <main className="contentMain">             
              <CreateUserFormWrapper/>
            </main>
            <aside className="contentSidebar contentSidebarLeft">
              <h2>Left Sidebar</h2>
              <p>Put your content here</p>
            </aside>
            <aside className="contentSidebar contentSidebarRight">                              
                <ViewUsers users={this.state.users}></ViewUsers>
            </aside>
          </div>
          <Footer></Footer>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
