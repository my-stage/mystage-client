import React from 'react';
import { User } from './api';


const userContextDefault: {
    user: User|null,
    setUser: (user: User|null) => void
    token: string,
    setToken: (token: string) => void,
} = {
    user: null,
    setUser: (user) => {},
    token: "",
    setToken: (token) => {},
};

const UserContext = React.createContext(userContextDefault);

export {
    UserContext
}