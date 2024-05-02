import { FC } from 'react'

import './TopUser.scss'

interface TopUserProps {
    topRate: number
}

export const TopUser: FC<TopUserProps> = ({ topRate }) => {
    return (
        <div className='topUser'>
            <img alt='' />
            <div>TOP {topRate}</div>
        </div>
    )
}
