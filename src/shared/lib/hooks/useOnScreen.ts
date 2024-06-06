import { useCallback, useState } from 'react'

const useOnScreen = ({ root = null, rootMargin = '0px', threshold = 0 }) => {
    const [observer, setObserver] = useState<IntersectionObserver>()
    const [isIntersecting, setIntersecting] = useState(false)

    const measureRef = useCallback(
        (node: Element | null) => {
            if (node) {
                const newObserver = new IntersectionObserver(
                    ([entry]) => {
                        setIntersecting(entry.isIntersecting)
                    },
                    { root, rootMargin, threshold }
                )

                newObserver.observe(node)
                setObserver(newObserver)
            }
        },
        [root, rootMargin, threshold]
    )

    return { measureRef, isIntersecting, observer }
}

export default useOnScreen
