import { FC } from 'react'
import clsx from 'clsx'
import { Work, WorkCard } from 'entities/work'
// import { Prize } from 'entities/prize'
// import { selectContestPrizes } from 'pages/contestPage/model/selectors'
// import { useAppSelector } from 'shared/lib/store'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { ContestWinnersTable } from 'widgets/winnersTable'

import './winnersSection.scss'

interface Props {
    className?: string
    winners: any[]
}

const WinnersSection: FC<Props> = (props, ) => {
    const { className, winners } = props


    // const prizes = useAppSelector(selectContestPrizes) as Prize[]

    // const otherPrizes = data.length < prizes.reduce((acc, item) => acc + item.winnersAmount, 0)

    console.log(winners.slice(0, 3))


    return (
        <section className={clsx('winners', className)}>
            <Text Tag='h2' size='title' bold className='winners__title'>
                Winners
            </Text>

            <ul className='winners__list'>
                {winners.map((work: Work, index: number) => (
                    <WorkCard
                        key={index}
                        data={work}
                        // workId={work.workId}
                        // prizeId={work.prizeId}
                        // openModal={openModal}
                        // className={clsx(idx === 0 && 'first-place')}
                    />
                ))}
            </ul>

                <VStack className='winners__other'>
                    {/* <Text
                        Tag='h3'
                        size='xl'
                        bold
                        className='winners__other-title'>
                        Other places
                    </Text> */}
                    <ContestWinnersTable />
                </VStack>
        </section>
    )
}

export default WinnersSection
