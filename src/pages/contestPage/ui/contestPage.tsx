import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Contest } from 'entities/contest'
import useAxios from 'shared/lib/hooks/useAxios'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { VStack } from 'shared/ui/stack'

import { selectContestMedia, selectContestOwnerId } from '../model/selectors'
import { fetchMediaWorks } from '../model/services'
import { contestWorksActions } from '../model/slice'

import СommentsSection from './components/commentsSection/commentsSection'
import DescriptionSection from './components/descriptionSection/descriptionSection'
import HeroSection from './components/heroSection/heroSection'
import WinnersSection from './components/winnersSection/winnersSection'
import WorksListSection from './components/worksListSection/worksListSection'

import './contestPage.scss'

const ContestPage = () => {
    const { id } = useParams<{ id: string }>()

    const dispatch = useAppDispatch()

    const ownerId = useAppSelector(selectContestOwnerId)
    const media = useAppSelector(selectContestMedia)

    if (!id) {
        return <p>Something went wrong</p>
    }

    const { data, isLoading } = useAxios<Contest>(`contests/${id}`)

    useEffect(() => {
        if (id !== ownerId) {
            dispatch(contestWorksActions.setOwnerId(id))
            dispatch(contestWorksActions.resetState())
        }

        if (id !== ownerId || !media.new.length) {
            dispatch(fetchMediaWorks(id))
        }
    }, [dispatch])

    useEffect(() => {
        if (data) {
            dispatch(contestWorksActions.setPrizes(data.prizes))
        }
    }, [dispatch, data])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!data) {
        return <p>Request error</p>
    }

    return (
        <VStack className='contest'>
            <HeroSection bg={data.backgroundImage} owner={data.contestOwner} />
            <VStack className='contest__container'>
                <DescriptionSection data={data} />
                {data.status === 'FINISHED' && data.topWinners?.length && (
                    <WinnersSection data={data.topWinners} />
                )}
                <WorksListSection worksAmount={data.participantAmount} />
                <СommentsSection ownerId={id} />
            </VStack>
        </VStack>
    )
}

export default ContestPage
