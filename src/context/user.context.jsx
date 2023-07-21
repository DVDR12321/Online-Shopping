import { createContext  } from "react";
import React, { useState } from 'react';


export const UserContext = createContext({
    currentUser: null, 
    setCurrentUser: () => null,
}) 
export default UserContext;

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}
    
    return ( <UserContext.Provider value={value}>{children}</UserContext.Provider> )
}


