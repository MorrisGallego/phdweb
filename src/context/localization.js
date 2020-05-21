import React, {createContext, useState} from "react";
import {getDefaultLanguage} from "../utils";
import * as translations from '../localization'

const LocalizationContext = createContext({})

export function LocalizationProvider({children}) {
    const [locale, setLocale] = useState(getDefaultLanguage())
    const changeLocale = locale => {
        localStorage.setItem("preferred-language", locale)
        setLocale(locale)
    }

    return <LocalizationContext.Provider value={{locale, changeLocale, strings: translations[locale]}}>{children}</LocalizationContext.Provider>
}

export { LocalizationContext }