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

    handleInput(event: React.FormEvent<HTMLInputElement | HTMLSelectElement>, fieldName: FieldName) {
        const value = event.currentTarget.value;
        switch(fieldName) {
            case FieldName.FirstName: {
                this.setState({
                    FirstName: value
                });
                break;
            }
            case FieldName.Surname: {
                this.setState({
                    Surname: value
                });
                break;
            }
            case FieldName.Age: {
                this.setState({
                    Age: parseInt(value)
                });
                break;
            }
            case FieldName.Gender: {
                this.setState({
                    Gender: (Gender as any)[value]
                });
                break;
            }
            case FieldName.RepositoryLink: {
                this.setState({
                    RepositoryLink: value
                });
                break;
            }
        }
    }

    public isValid() : boolean {         
         return this.state.FirstName !== "" 
            && this.state.Surname !== ""
            && this.state.Age > 0
            && this.state.RepositoryLink != "";
    }

    public handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        debugger;
        event.preventDefault();
        console.log("submit clicked");
        if(this.isValid()) {
            // save store and eventually persist DB / storage
        }
        return false;
    }
    
    render() { 
        return(
            <div className="creaeUserForm_container">
                <h2>Create a new user</h2>
                <p>Please fill in the details below and click 'Submit' to become a new user on this site. Becoming a member
        handleClickof this site gives you absolutely no benefit. So, what are you waiting for!
                </p>

                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="createUserForm_field">
                        <label className="createUserForm_fieldLabel">First Name: </label>               
                        <input className="createUserForm_fieldInput" type = "text" maxLength = {15} value={this.state.FirstName} onChange = { (event) => this.handleInput(event, FieldName.FirstName)} />
                    </div>
                    <div className="createUserForm_field">
                        <label className="createUserForm_fieldLabel">Surname: </label>               
                        <input className="createUserForm_fieldInput" type = "text" maxLength = {15} value={this.state.Surname} onChange = { (event) => this.handleInput(event, FieldName.Surname)} />
                    </div>
                    <div className="createUserForm_field">
                        <label className="createUserForm_fieldLabel">Age: </label>               
                        <input className="createUserForm_fieldInput" type = "number" maxLength = {3} value={this.state.Age} onChange = { (event) => this.handleInput(event, FieldName.Age)} />
                    </div>
                    <div className="createUserForm_field">
                        <label className="createUserForm_fieldLabel">Gender: </label>               
                       <select className="createUserForm_fieldInput" onChange= { event => { this.handleInput(event, FieldName.Gender) } }>
                            <option value="PreferNotToSay">Prefer Not To Say</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>    
                    </div>
                    <div className="createUserForm_field">
                        <label className="createUserForm_fieldLabel">Repository Link:</label>
                        <input className="createUserForm_fieldInput" type = "text" placeholder = "You can enter a url or start typing the name of the user" value={this.state.RepositoryLink} onChange = { (event) => this.handleInput(event, FieldName.RepositoryLink)} />
                    </div>
                    <SearchGitHub searchTerm = {this.state.RepositoryLink} onRepositoryUrlSelected = { (url) => this.setState({ RepositoryLink: url }) }></SearchGitHub>
                    <input type="submit" value="Create User" className="createUserForm_button"></input>
                </form>
            </div>
        );
    }
}