import React, { Component } from 'react'; 
import './viewUsers.scss'
import IViewUsersProps from './interface/IViewUsersProps';



export default class ViewUsers extends Component<IViewUsersProps, {}> { 
    public render() {
        const users =   this.props.users.map((user, index) => { 
            return  <div className="viewUsers_user" key={index}>
            <div className="viewUsers_userIimage">
                <img src={ user.AvatarUrl ? user.AvatarUrl : "https://avatars0.githubusercontent.com/u/46134431?v=4"}></img>
            </div>
            <div className="viewUsers_userField">
                <div className="viewUsers_userFieldName">Name: </div>
                <div className="viewUsers_userFieldValue">{user.FirstName} {user.Surname}</div>
            </div>
            <div className="viewUsers_userField">
                <div className="viewUsers_userFieldName">Age: </div>
                <div className="viewUsers_userFieldValue">{user.Age}</div>
            </div>
            <div className="viewUsers_userField">
                <div className="viewUsers_userFieldName">Gender: </div>
                <div className="viewUsers_userFieldValue">{user.Gender}</div>
            </div>
            <div className="viewUsers_userField">
                <div className="viewUsers_userFieldName">Repository link: </div>
                <div className="viewUsers_userFieldValue"><a href={user.RepositoryLink} title={user.RepositoryLink}>{user.RepositoryLink}</a></div>
            </div>
        </div>
        });
        
        return <div className="viewUsers">
                    <h2>Latest users appear here</h2>
                    <div className="viewUsersContainer">
                        {users}
                    </div>
        </div>
    }
}
