import { ReactNode } from 'react'
import clsx from 'clsx'

import Flex from '../flex/flex'

import './hStack.scss'

interface HStackProps {
    children: ReactNode
    className?: string
}

export default function HStack({ children, className }: HStackProps) {
    return <Flex className={clsx('flex__row', className)}>{children}</Flex>
}
