import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    // Checking if there's any value in local storage then set to null if there's not
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("swiftuser")) || null
    );

    const updateUser = (data) => {
        setCurrentUser(data);
    };

    // creating key user info gotten from the backend data
    useEffect(() => {
        localStorage.setItem("swiftuser", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}