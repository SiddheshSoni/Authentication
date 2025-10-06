import React, {useState} from "react";

const AuthContext = React.createContext({
    token:'',
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (token) => {}
});
export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);

    const isUserLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
    };
    const loginHandler = (token) => {
        setToken(token);
        console.log(token);
    };
    const defaultValue = {
        token: token,
        isLoggedIn: isUserLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
    }

    return <AuthContext.Provider value={defaultValue}> {props.children}</AuthContext.Provider> 
}

export default AuthContext;