import React, { Component } from 'react';
import IUser from "./interface/IUser";
import { Gender } from "./interface/IGender";
import {FieldName} from "./enum/FieldName";
import SearchGitHub from "../gitHub/SearchGitHub"

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
            <form>
                <label>First Name: </label>               
                <input type = "text" maxLength = {15} value={this.state.FirstName} onChange = { (event) => this.handleChange(event, FieldName.FirstName)} />

                <label>Repository Link:</label>
                <input type = "text" placeholder = "You can enter a url or start typing the name of the user " value={this.state.RepositoryLink} onChange = { (event) => this.handleChange(event, FieldName.RepositoryLink)} />
                
                <SearchGitHub searchTerm = {this.state.RepositoryLink} onRepositoryUrlSelected = { (url) => this.setState({ RepositoryLink: url }) }></SearchGitHub>
            </form>
        );
    }
}