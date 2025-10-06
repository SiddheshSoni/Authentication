import React, {useState} from "react";

const AuthContext = React.createContext({
    token:'',
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (token) => {}
});
export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const isUserLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null); 
        localStorage.removeItem('token'); // remove token from localStorage
        console.log(token);
    };
    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token); // store token in localStorage
        console.log(token);
    };
    const defaultValue = {
        token: localStorage.getItem('token'),
        isLoggedIn: isUserLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
    }
    
    
    return <AuthContext.Provider value={defaultValue}>{console.log(localStorage.getItem('token'))} {props.children}</AuthContext.Provider> 
}

export default AuthContext;