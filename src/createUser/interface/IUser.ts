import IAddress from "./IAddress";
import { Gender } from "./IGender";

export default interface IUser {
    FirstName: string,
    Surname: string,
    Age: number,
    Gender: Gender,
    Address: IAddress,
    RepositoryLink: string
}