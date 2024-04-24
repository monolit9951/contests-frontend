import clsx from 'clsx'

import './footer.scss'

export const Footer = ({ className }: { className?: string }) => {
    return (
        <div className={clsx('footer', className)} />
    )
}
