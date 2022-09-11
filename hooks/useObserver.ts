import { useEffect, useRef } from "react"
import { useActions } from "./useActions"
import { useTypedSelector } from "./useTypedSelector"

type UseObserver = (
    target: React.MutableRefObject<HTMLDivElement>,
    query: string,
) => void

export const useObserver: UseObserver = (target, query) => {
    const observer = useRef(null)
    const { fetchMoreTracksAction } = useActions()
    const { total } = useTypedSelector(store => store.track)
    let page = 1

    useEffect(() => {
        if (observer.current && query) {
            observer.current.disconnect()
            observer.current = null
            page = 1
        } else if (!observer.current && !query) {
            observer.current = new IntersectionObserver(addTracks, { threshold: 1.0 });
            observer.current.observe(target.current)
        }
    }, [query])

    function addTracks(entries) {
        const count = 10 // Кол-во треков
        const isIntersecting = entries[0].isIntersecting

        if (isIntersecting && (page * count < total)) {
            fetchMoreTracksAction(count, page * count)
            page += 1
        }
    }
}
