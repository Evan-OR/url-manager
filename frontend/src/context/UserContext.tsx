//create user react context

import React, { createContext, useState } from 'react';
import { User } from '../utils/types';

type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type UserContextProviderProps = {
    children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    // Add custom log in and out hadnling here

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
