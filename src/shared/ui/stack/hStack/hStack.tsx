import { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

import Flex from '../flex/flex'

import './hStack.scss'

interface HStackProps {
    children: ReactNode
    className?: string
}

const HStack = forwardRef<HTMLDivElement, HStackProps>((props, ref) => {
    const { children, className } = props

    return (
        <Flex ref={ref} className={clsx('flex__row', className)}>
            {children}
        </Flex>
    )
})

export default HStack
