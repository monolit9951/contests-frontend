import { FC } from 'react'
import PuffLoader from 'react-spinners/PuffLoader'
import clsx from 'clsx'

import './spinner.scss'

interface Props {
    top?: boolean
    center?: boolean
    bottom?: boolean
}

const Spinner: FC<Props> = (props) => {
    const { top, center, bottom } = props

    if (!top && !center && !bottom) {
        return (
            <div className='loader-wrapper'>
                <PuffLoader aria-label='loading' />
            </div>
        )
    }

    return (
        <PuffLoader
            className={clsx(
                'spinner',
                top && 'top',
                center && 'center',
                bottom && 'bottom'
            )}
            aria-label='loading'
        />
    )
}

export default Spinner
