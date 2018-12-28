import IUser from './createUser/interface/IUser'
import React from 'react';

export interface IUserContext {
    onUserCreated: (user:  IUser) => void;
}

export default React.createContext<IUserContext>({
    onUserCreated: (user) => {  throw new Error('updateCount() not implemented') }
});