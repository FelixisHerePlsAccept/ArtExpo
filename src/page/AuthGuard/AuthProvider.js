import { createContext, useEffect, useMemo, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const AuthContext = createContext({});

const INITIAL_STATE = {
    currentUser: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null,
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(state.currentUser)) // save userID in local storage
        console.log('userData', state.currentUser)
    }, [state.currentUser])

    const MemoizedValue = useMemo (
        () => ({
            currentUser: state.currentUser,
        }),
        [state.currentUser]
    )

    return <AuthContext.Provider value={{ ...MemoizedValue, dispatch }}>{children}</AuthContext.Provider>
}

export default AuthContext;