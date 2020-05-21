import useData from './github'

export function usePapers(count, page){
    const data = useData()

    return {
        content: data?.papers?.slice(page*count, page*count+count),
        pages: Math.ceil(data?.papers?.length / count)
    }
}
export function usePaper(paper) {
    const data = useData()

    return data?.papers?.find(({id}) => id === paper)
}
export function usePersonalInfo() {
    const data = useData()

    return data?.about
}