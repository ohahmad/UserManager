import IUser from "./IUser";

export default interface ICreateUserFormState extends IUser {
    FirstNameTouched: boolean;
    FirstNameValid?: boolean;

    SurnameNameTouched: boolean;
    SurnameValid?: boolean;

    AgeTouched: boolean;
    AgeValid?: boolean;
    
    RepositoryLinkTouched: boolean;
    RepositoryLinkValid?: boolean;
} 