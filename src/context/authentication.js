import React, {createContext, useState} from "react";

const AuthenticationContext = createContext({authenticated: false, token: null, errors: false, authenticate: () => {}, logout: () => {}})

export function AuthenticationProvider({children}) {
    //Change default authenticated value to false
    const [authenticated, setAuthenticated] = useState(true)
    const [token, setToken] = useState(null)
    const [errors, setErrors] = useState(false)

    const authenticate = (user, pass) => {
        // TODO check against server
        setAuthenticated(true)
        setToken('asdf')
        setErrors(false)
    }

    const logout = () => {
        setAuthenticated(false)
        setToken(null)
        setErrors(false)
    }

    return <AuthenticationContext.Provider value={{authenticated, token, errors, authenticate, logout}}>
        {children}
    </AuthenticationContext.Provider>
}

export {AuthenticationContext}