import React from 'react';
import {shallow, mount, ReactWrapper} from 'enzyme';
import CreateUserForm from '../CreateUserForm';
import ICreateUserFormState from '../interface/ICreateUserFormState';

describe("CreateUserForm component", () => {
    describe("form validation", () => {
        let createUserForm: ReactWrapper<{}, ICreateUserFormState, CreateUserForm>;        
        createUserForm = mount(<CreateUserForm></CreateUserForm>);
        describe("When initial form is loaded", () => {
            it("should not display any error messages", () => {
                expect(createUserForm.find(".createUserForm_fieldValidationMessage").length).toEqual(0);
            });
        });
        describe("When form is submitted without any details being entered", () => {
            let validationMessages: ReactWrapper;
            beforeAll(() => {
                createUserForm.find('form').at(0).simulate('submit');
                validationMessages = createUserForm.find(".createUserForm_fieldValidationMessage");
            });
            it("should display a required first name message", () => {
                expect(validationMessages.at(0).text()).toEqual("Please enter your first name");
            });
            it("should display a required surname message", () => {
                expect(validationMessages.at(1).text()).toEqual("Please enter your surname");
            });
            it("should display a required age message", () => {
                expect(validationMessages.at(2).text()).toEqual("Please enter your age");
            });
            it("should display a required repository url message", () => {
                expect(validationMessages.at(3).text()).toEqual("Please enter your repository url");
            });
        });
        describe("When values are entered into inputs", () => { 
            let fieldValidationTest = (indexFieldName: number, fieldValue: string) => {
                describe("when value is inputted", () => {
                    it(`no longer display the error message`, () => {
                        let fieldInput = createUserForm.find(".createUserForm_fieldContainer").at(indexFieldName).find("input").at(0);
                        // https://github.com/airbnb/enzyme/issues/218 - enzyme doesn't support mocking currentTarget so have to manipulate dom node
                        (fieldInput.getDOMNode() as HTMLInputElement).value = fieldValue;  
                        fieldInput.simulate('change');

                        let validationMessage = createUserForm.find(".createUserForm_fieldContainer").at(indexFieldName).find(".createUserForm_fieldValidationMessage");
                        expect(validationMessage.length).toEqual(0);
                    });

                    describe("when value is removed again", () => {
                        it(`displays the error message again on blur`, () => {
                            let fieldInput = createUserForm.find(".createUserForm_fieldContainer").at(indexFieldName).find("input").at(0);
                            (fieldInput.getDOMNode() as HTMLInputElement).value = "";  
                            fieldInput.simulate('change');
                            fieldInput.simulate('blur');
                            
                            let validationMessage = createUserForm.find(".createUserForm_fieldContainer").at(indexFieldName).find(".createUserForm_fieldValidationMessage");
                            
                            expect(validationMessage.length).toEqual(1);
                        });
                    });               
                });                 
            }

            describe("first name", () => {
                fieldValidationTest(0, "blob");
            });

            describe("surname", () => {
                fieldValidationTest(1, "master");
            });  
            
            describe("Age", () => {
                fieldValidationTest(2, "10");
            });  

            describe("Repository Link", () => {
                fieldValidationTest(4, "http://github.com/blah");
            });  
        });
    });
});