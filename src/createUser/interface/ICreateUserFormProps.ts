import IUser from "./IUser";

export default interface ICreateUserFormProps {
    onUserCreated: (user: IUser) => void;
}