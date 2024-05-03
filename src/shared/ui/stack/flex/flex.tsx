import { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

import './flex.scss'

interface FlexProps {
    children: ReactNode
    className?: string
}

const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
    const { children, className } = props

    return (
        <div ref={ref} className={clsx('flex', className)}>
            {children}
        </div>
    )
})

export default Flex
