import { FC } from 'react'

import './topUser.scss'

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
