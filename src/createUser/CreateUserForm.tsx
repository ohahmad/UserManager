import React, { Component } from 'react';
import { Gender } from "./interface/IGender";
import {FieldName} from "./enum/FieldName";
import SearchGitHub from "../gitHub/SearchGitHub"
import './CreateUserForm.scss'
import ICreateUserFormState from './interface/ICreateUserFormState';
import ICreateUserFormProps from './interface/ICreateUserFormProps';


export default class CreateUserForm extends Component<ICreateUserFormProps, ICreateUserFormState> {
    constructor(props: ICreateUserFormProps) {
        super(props);
        this.state = {
            FirstName: "",
            FirstNameTouched: false,
            Surname: "",
            SurnameNameTouched: false,
            Age: 0,
            AgeTouched: false,
            Gender: Gender.PreferNotToSay,
            RepositoryLink: "",
            RepositoryLinkTouched: false,
            AvatarUrl: "",
            Address: {
                AddressLineOne: "", 
                CityTown: "",
                PostCode: ""
            }
        };    
    }

    private handleInput(event: React.FormEvent<HTMLInputElement | HTMLSelectElement>, fieldName: FieldName) {
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
                    Age: value ? parseInt(value) : value as any
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
        
        this.setFieldIsValid(fieldName, value);
    }

    private setFieldIsValid(field: FieldName, fieldValue?: string) {    
        console.log("setFieldIsValid field: " + field + " value:" + fieldValue); 
        if(field) {
            switch(field) {
                case FieldName.Surname: {
                    const isValid = (fieldValue || this.state.Surname) !== "";
                    this.setState({
                        SurnameValid: isValid,
                        SurnameNameTouched: true
                    });
                    break;
                }
                case FieldName.Age: {
                    const parsedFieldValue = fieldValue ? parseInt(fieldValue) : null;
                    const isValid =  (parsedFieldValue || this.state.Age) > 0;
                    this.setState({
                        AgeValid: isValid,
                        AgeTouched: true
                    });
                    break;
                }
                case FieldName.RepositoryLink: {
                    const isValid = (fieldValue || this.state.RepositoryLink) > "";
                    this.setState({
                        RepositoryLinkValid: isValid,
                        RepositoryLinkTouched: true
                    });
                    break;
                }
                default : {
                    const isValid = (fieldValue || this.state.FirstName) !== "";
                    
                    this.setState({
                        FirstNameValid: isValid,
                        FirstNameTouched: true
                    });
                    break;
                }
            }
        }
        return true;
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        console.log("handle submit called");
        event.preventDefault();
        
        const formIsValid = this.state.FirstNameValid
                && this.state.SurnameValid
                && this.state.AgeValid
                && this.state.RepositoryLinkValid;

        if(formIsValid) {
            // save store and eventually persist DB / storage
            console.log("CreateUserForm: calling onUserCreated")
            const {FirstName, Surname, Age, Gender, RepositoryLink, Address, AvatarUrl} = this.state;
            
            this.props.onUserCreated({
                FirstName,
                Surname,
                Age,
                Gender: Gender,
                RepositoryLink,
                Address,
                AvatarUrl
            })
        }
        else {
            console.log("form is invalid");
            if(!this.state.FirstNameTouched) {
                this.setFieldIsValid(FieldName.FirstName);
            }
            if(!this.state.SurnameNameTouched) {
                this.setFieldIsValid(FieldName.Surname);
            }
            if(!this.state.AgeTouched) {
                this.setFieldIsValid(FieldName.Age);
            }
            if(!this.state.RepositoryLinkTouched) {
                this.setFieldIsValid(FieldName.RepositoryLink);
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

                <form ref="createUserForm"  onSubmit={(event) => this.handleSubmit(event)}>
                    <div className={ `createUserForm_fieldContainer ${ this.state.FirstNameTouched && !this.state.FirstNameValid ? "createUserForm_fieldContainer_error" : ""  }` }>
                        <div className="createUserForm_field">
                            <label className="createUserForm_fieldLabel">First Name: </label>               
                            <input className="createUserForm_fieldInput" type = "text" 
                                    maxLength = {15} 
                                    value={this.state.FirstName} 
                                    onChange = { (event) => this.handleInput(event, FieldName.FirstName)}
                                    onBlur = { () => this.setFieldIsValid(FieldName.FirstName) } />
                        </div>
                       { this.state.FirstNameTouched && !this.state.FirstNameValid ? <span className="createUserForm_fieldValidationMessage">Please enter your first name</span> : null }
                    </div>
                    <div className={ `createUserForm_fieldContainer ${ this.state.SurnameNameTouched && !this.state.SurnameValid ? "createUserForm_fieldContainer_error" : ""  }` }>
                        <div className="createUserForm_field">
                            <label className="createUserForm_fieldLabel">Surname: </label>               
                            <input className="createUserForm_fieldInput" type = "text" 
                                    maxLength = {15} 
                                    value={this.state.Surname} 
                                    onChange = { (event) => this.handleInput(event, FieldName.Surname)} 
                                    onBlur = { () => this.setFieldIsValid(FieldName.Surname) } />
                        </div>
                        { this.state.SurnameNameTouched && !this.state.SurnameValid ? <span className="createUserForm_fieldValidationMessage">Please enter your surname</span> : null }
                    </div>
                    <div className={ `createUserForm_fieldContainer ${ this.state.AgeTouched && !this.state.AgeValid ? "createUserForm_fieldContainer_error" : ""  }` }>
                        <div className="createUserForm_field">
                            <label className="createUserForm_fieldLabel">Age: </label>               
                            <input className="createUserForm_fieldInput" type = "number" 
                                    maxLength = {3} value={this.state.Age} 
                                    onChange = { (event) => this.handleInput(event, FieldName.Age)}
                                    onBlur = { () => this.setFieldIsValid(FieldName.Age) } />
                        </div>
                        { this.state.AgeTouched && !this.state.AgeValid ? <span className="createUserForm_fieldValidationMessage">Please enter your age</span> : null }
                    </div>
                    <div className="createUserForm_fieldContainer">
                        <div className="createUserForm_field">
                            <label className="createUserForm_fieldLabel">Gender: </label>               
                        <select className="createUserForm_fieldInput" onChange= { event => { this.handleInput(event, FieldName.Gender) } }>
                                <option value="PreferNotToSay">Prefer Not To Say</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>    
                        </div>
                    </div>
                    <div className={ `createUserForm_fieldContainer ${ this.state.RepositoryLinkTouched && !this.state.RepositoryLinkValid ? "createUserForm_fieldContainer_error" : ""  }` }>
                        <div className="createUserForm_field">
                            <label className="createUserForm_fieldLabel">Repository Link:</label>
                            <input className="createUserForm_fieldInput" type = "text" 
                                placeholder = "You can enter a url or start typing the name of the user" 
                                value={this.state.RepositoryLink} 
                                onChange = { (event) => this.handleInput(event, FieldName.RepositoryLink)}
                                onBlur = { () => this.setFieldIsValid(FieldName.RepositoryLink) } />
                        </div>
                        { this.state.RepositoryLinkTouched && !this.state.RepositoryLinkValid ? <span className="createUserForm_fieldValidationMessage">Please enter your repository url</span> : null }
                    </div>
                    <SearchGitHub searchTerm = {this.state.RepositoryLink} onRepositoryUrlSelected = { (url, avatarUrl) => this.setState({ RepositoryLink: url, AvatarUrl: avatarUrl }) }></SearchGitHub>
                    <input type="submit" value="Create User" className="createUserForm_button"></input>
                </form>
            </div>
        );
    }
}