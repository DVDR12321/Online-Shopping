import { createContext  } from "react";
import React, { useState, useEffect } from 'react';

import { onAuthStateChangedlistener, signOutUser } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null, 
    setCurrentUser: () => null,
}) 
export default UserContext;

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  //attaching listener
  useEffect(() => {
    const unsubscribe = onAuthStateChangedlistener((user) => {
      console.log(user);
      setCurrentUser(user);
    });

    // this will run on unmount
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};


