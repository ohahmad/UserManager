
import UserContext from '../UsersContext';
import CreateUserForm from "./CreateUserForm";
import React from 'react';

const CreateUserFormWrapper = () => <UserContext.Consumer>
{ ({ onUserCreated }) => (
    <CreateUserForm onUserCreated = { onUserCreated } />
    )
}                
</UserContext.Consumer>

export default CreateUserFormWrapper;