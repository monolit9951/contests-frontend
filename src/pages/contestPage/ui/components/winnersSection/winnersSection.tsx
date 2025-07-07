import { FC } from 'react'
import clsx from 'clsx'
import { TopWinners } from 'entities/contest'
import { Prize } from 'entities/prize'
import { Work, WorkCard } from 'entities/work'
import { selectContestPrizes } from 'pages/contestPage/model/selectors'
import { useAppSelector } from 'shared/lib/store'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { ContestWinnersTable } from 'widgets/winnersTable'

import './winnersSection.scss'

interface Props {
    data: TopWinners[]
    openModal: (work: Work) => void
    className?: string
}

const WinnersSection: FC<Props> = (props) => {
    const { data, openModal, className } = props

    const prizes = useAppSelector(selectContestPrizes) as Prize[]

    const otherPrizes = data.length < prizes.reduce((acc, item) => acc + item.winnersAmount, 0)

    console.log(data)

    return (
        <section className={clsx('winners', className)}>
            <Text Tag='h2' size='title' bold className='winners__title'>
                Winners
            </Text>

            <ul className='winners__list'>
                {data.map((work, idx) => (
                    <WorkCard
                        key={work.workId}
                        data={work}
                        prizeId={work.prizeId}
                        openModal={openModal}
                        className={clsx(idx === 0 && 'first-place')}
                    />
                ))}
            </ul>

            {data.map((item, index) => (
                <div key={index}>{item.workId}</div>
            ))}

            {otherPrizes && (
                <VStack className='winners__other'>
                    <Text
                        Tag='h3'
                        size='xl'
                        bold
                        className='winners__other-title'>
                        Other places
                    </Text>
                    <ContestWinnersTable openModal={openModal} />
                </VStack>
            )}
        </section>
    )
}

export default WinnersSection
