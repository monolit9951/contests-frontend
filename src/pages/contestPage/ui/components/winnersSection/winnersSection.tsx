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
        worksArr: [1, 2, 3],
    }

    return (
        <section className={clsx('winners', className)}>
            <Text Tag='h2' size='title' bold className='winners__title'>
                Winners
            </Text>

            <ul className='winners__list'>
                {contestObj.worksArr.map((item, idx) => (
                    <WorkCard
                        key={item}
                        data={{
                            id: '66447084974544731c52eeac',
                            ownerId: '66447082974544731c52eba4',
                            description: 'Test Description for Work 333',
                            media: null,
                            likeAmount: 866,
                            commentAmount: 198,
                            user: {
                                id: '6644707e974544731c52e1cd',
                                name: 'Mia Harris',
                                participantRating: 5.35,
                                organizerRating: null,
                                verificationStatus: 'STORE',
                                profileImage:
                                    'https://example.profileImage.com/image19.jpg',
                            },
                            popularity: 1,
                            typeWork: 'TEXT',
                        }}
                        place={idx + 1}
                    />
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
