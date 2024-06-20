import { FC } from 'react'
import clsx from 'clsx'
import { TopWinners } from 'entities/contest'
import { Prize } from 'entities/prize'
import { WorkCard } from 'entities/work'
import { selectContestPrizes } from 'pages/contestPage/model/selectors'
import { useAppSelector } from 'shared/lib/store'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { ContestWinnersTable } from 'widgets/winnersTable'

import './winnersSection.scss'

interface Props {
    data: TopWinners[]
    className?: string
}

const WinnersSection: FC<Props> = (props) => {
    const { data, className } = props

    const prizes = useAppSelector(selectContestPrizes) as Prize[]

    const otherPrizes =
        data.length < prizes.reduce((acc, item) => acc + item.winnersAmount, 0)

    return (
        <section className={clsx('winners', className)}>
            <Text Tag='h2' size='title' bold className='winners__title'>
                Winners
            </Text>

            <ul className='winners__list'>
                {data.map(({ work, prizeId }) => (
                    <WorkCard key={work.id} data={work} prizeId={prizeId} />
                ))}
            </ul>

            {otherPrizes && (
                <VStack className='winners__other'>
                    <Text
                        Tag='h3'
                        size='xl'
                        bold
                        className='winners__other-title'>
                        Other places
                    </Text>
                    <ContestWinnersTable />
                </VStack>
            )}
        </section>
    )
}

export default WinnersSection
