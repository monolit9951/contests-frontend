import { ReactNode } from 'react'
import clsx from 'clsx'

import './Flex.scss'

interface FlexProps {
    children: ReactNode
    className?: string
}

export default function Flex({ children, className }: FlexProps) {
    return <div className={clsx('flex', className)}>{children}</div>
}
