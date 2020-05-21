import {useContext} from "react";
import {AuthenticationContext} from "../context/authentication";

export function useAuthentication(){
    return useContext(AuthenticationContext)
}