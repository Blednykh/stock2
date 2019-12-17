import { createContext } from 'react';

const UserContext = createContext({
    authenticated: false,
    toggleAuthenticated(){}
});

export default UserContext;
