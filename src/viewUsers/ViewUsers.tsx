import React, { Component } from 'react'; 
import './viewUsers.scss'
export default class CreateUserForm extends Component<{}, {}> { 
    public render() {
        return <div className="viewUsers">
                    <h2>Latest users appear here</h2>
                    <div className="viewUsersContainer">
                        <div className="viewUsers_user">
                            <div className="viewUsers_userIimage">
                                <img src="https://avatars0.githubusercontent.com/u/46134431?v=4"></img>
                            </div>
                            <div className="viewUsers_userField">
                                <div className="viewUsers_userFieldName">Name: </div>
                                <div className="viewUsers_userFieldValue">Ommer Ahmad</div>
                            </div>
                            <div className="viewUsers_userField">
                                <div className="viewUsers_userFieldName">Age: </div>
                                <div className="viewUsers_userFieldValue">70</div>
                            </div>
                            <div className="viewUsers_userField">
                                <div className="viewUsers_userFieldName">Gender: </div>
                                <div className="viewUsers_userFieldValue">Prefer not to say</div>
                            </div>
                            <div className="viewUsers_userField">
                                <div className="viewUsers_userFieldName">Repository link: </div>
                                <div className="viewUsers_userFieldValue"><a href="https://github.com/ohahmad" title="https://github.com/ohahmad">https://github.com/ohahmad</a></div>
                            </div>
                        </div>
                        <div className="viewUsers_user">
                            <div className="viewUsers_userIimage">
                                <img src="https://avatars0.githubusercontent.com/u/46134431?v=4"></img>
                            </div>
                            <div className="viewUsers_userField">
                                <div className="viewUsers_userFieldName">Name: </div>
                                <div className="viewUsers_userFieldValue">Ommer Ahmad</div>
                            </div>
                            <div className="viewUsers_userField">
                                <div className="viewUsers_userFieldName">Age: </div>
                                <div className="viewUsers_userFieldValue">70</div>
                            </div>
                            <div className="viewUsers_userField">
                                <div className="viewUsers_userFieldName">Gender: </div>
                                <div className="viewUsers_userFieldValue">Prefer not to say</div>
                            </div>
                            <div className="viewUsers_userField">
                                <div className="viewUsers_userFieldName">Repository link: </div>
                                <div className="viewUsers_userFieldValue"><a href="https://github.com/ohahmad" title="https://github.com/ohahmad">https://github.com/ohahmad</a></div>
                            </div>
                        </div>
                    </div>
        </div>
    }
}
