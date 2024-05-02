import { ReactNode } from 'react'
import clsx from 'clsx'

import Flex from '../flex/flex'

import './vStack.scss'

interface VStackProps {
    children: ReactNode
    className?: string
}

export default function VStack(props: VStackProps) {
    const { children, className } = props
    return <Flex className={clsx('flex__col', className)}>{children}</Flex>
}
