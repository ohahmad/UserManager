import React, { Component } from 'react';
import IUser from "./interface/IUser";
import { Gender } from "./interface/IGender";
import {FieldName} from "./enum/FieldName";
import SearchGitHub from "../gitHub/SearchGitHub"
import './CreateUserForm.scss'
export default class CreateUserForm extends Component<{}, IUser> {
    constructor(props: {}) {
        super(props);
        this.state = {
            FirstName: "",
            Surname: "",
            Age: 0,
            Gender: Gender.PreferNotToSay,
            RepositoryLink: "",
            Address: {
                AddressLineOne: "", 
                CityTown: "",
                PostCode: ""
            }
        };    
    }

    handleChange(event: React.FormEvent<HTMLInputElement>, fieldName: FieldName) {
        switch(fieldName) {
            case FieldName.FirstName: {
                this.setState({
                    FirstName: event.currentTarget.value
                });
                break;
            }
            case FieldName.RepositoryLink: {
                this.setState({
                    RepositoryLink: event.currentTarget.value
                });
                break;
            }
        }
    }

    render() {        
        return(
            <div className="creaeUserForm_container">
                <h2>Create a new user</h2>
                <p>Please fill in the details below and click 'Submit' to become a new user on this site. Becoming a member
                    of this site gives you absolutely no benefit. So, what are you waiting for!
                </p>

                <form>
                    <div className="createUserForm_field">
                        <label className="createUserForm_fieldLabel">First Name: </label>               
                        <input className="createUserForm_fieldInput" type = "text" maxLength = {15} value={this.state.FirstName} onChange = { (event) => this.handleChange(event, FieldName.FirstName)} />
                    </div>
                    <div className="createUserForm_field">
                        <label className="createUserForm_fieldLabel">Repository Link:</label>
                        <input className="createUserForm_fieldInput" type = "text" placeholder = "You can enter a url or start typing the name of the user " value={this.state.RepositoryLink} onChange = { (event) => this.handleChange(event, FieldName.RepositoryLink)} />
                    </div>
                    <SearchGitHub searchTerm = {this.state.RepositoryLink} onRepositoryUrlSelected = { (url) => this.setState({ RepositoryLink: url }) }></SearchGitHub>
                </form>
            </div>
        );
    }
}