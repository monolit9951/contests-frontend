import { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

import Flex from '../flex/flex'

import './vStack.scss'

interface VStackProps {
    children: ReactNode
    className?: string
}

const VStack = forwardRef<HTMLDivElement, VStackProps>((props, ref) => {
    const { children, className } = props

    return (
        <Flex ref={ref} className={clsx('flex__col', className)}>
            {children}
        </Flex>
    )
})

export default VStack
