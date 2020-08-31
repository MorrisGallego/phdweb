const publishers = {}
const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink', 'gray']

export function getColor(publisher) {
    const usedColors = Object.values(publishers)

    if(!publishers[publisher]){
        publishers[publisher] = colors.filter(color => !usedColors.includes(color))[0];
    }

    return publishers[publisher]
}