import React, {useState, createContext} from "react";

export const AuthContext = createContext();

export const AuthProvider = props => {
    const [authState, setauthState] = useState({
        _id: '',
        name: '',
        email: ''
        

    })
}