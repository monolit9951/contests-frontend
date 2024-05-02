import { ReactNode } from 'react'
import clsx from 'clsx'

import './flex.scss'

interface FlexProps {
    children: ReactNode
    className?: string
}

export default function Flex({ children, className }: FlexProps) {
    return <div className={clsx('flex', className)}>{children}</div>
}
