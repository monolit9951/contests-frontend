import React from 'react'
import { Button } from 'shared/ui/button'

import './contestCard.scss'

interface ContestCardProps {
    date?: string
    name?: string
    isVerified?: boolean
}

export const ContestCard: React.FC<ContestCardProps> = ({ date, ...rest }) => {
    return (
        <div className='contest-card-wrapper'>
            <div className='contest-card-header'>
                <div className='user-box'>
                    <img alt='' />
                    <div className='user-des'>
                        <div className='name-box'>
                            <span>{rest.name}</span>
                            {rest.isVerified && <img alt='' />}
                        </div>
                        <div className='rating' />
                    </div>
                </div>
            </div>
            <div className='btn-box'>
                <div className='date'>
                    <p>Completing the task</p>
                    <span>{date}</span>
                </div>
                <Button variant='ghost'>See details</Button>
            </div>
        </div>
    )
}
