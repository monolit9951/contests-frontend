import { FC } from 'react'
import clsx from 'clsx'
import { PrizePlaces } from 'entities/prize/ui/topPrize'
import { WorkCard } from 'entities/work'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { ContestWinnersTable } from 'widgets/winnersTable'

import './winnersSection.scss'

interface ContestObj {
    worksType: 'media' | 'text'
    worksArr: PrizePlaces[]
}

interface Props {
    className?: string
}

const WinnersSection: FC<Props> = (props) => {
    const { className } = props

    const contestObj: ContestObj = {
        worksType: 'text',
        worksArr: ['1st', '2nd', '3rd'],
    }

    const isText = contestObj.worksType === 'text'

    return (
        <section className={clsx('winners', className)}>
            <Text Tag='h2' size='title' bold className='winners__title'>
                Winners
            </Text>

            <ul className='winners__list'>
                {contestObj.worksArr.map((item) => (
                    <WorkCard key={item} place={item} isText={isText} />
                ))}
            </ul>
            <VStack className='winners__other'>
                <Text Tag='h3' size='xl' bold className='winners__other-title'>
                    Other places
                </Text>
                <ContestWinnersTable />
            </VStack>
        </section>
    )
}

export default WinnersSection
