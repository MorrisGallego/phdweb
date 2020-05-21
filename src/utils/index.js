import slugify from "slugify";

const publishers = {}
const colors = ["red", "orange", "yellow", "green", "teal", "blue", "indigo", "purple", "pink", "gray"]

export function getColor(publisher) {
    const usedColors = Object.values(publishers)

    if(!publishers[publisher]){
        publishers[publisher] = colors.filter(color => !usedColors.includes(color))[0];
    }

    return publishers[publisher]
}

export function buildURL(title) {
    return `/${slugify(title, {lower: true, strict: true})}`
}

export function getDefaultLanguage() {
    const browserLanguage = navigator.language
    const preference = localStorage.getItem("preferred-language")

    if(['es', 'en', 'gl'].includes(preference))
        return preference
    else if(['es', 'en', 'gl'].includes(browserLanguage))
        return browserLanguage
    else return 'en'
}