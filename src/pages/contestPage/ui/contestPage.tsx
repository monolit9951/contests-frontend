import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Contest } from 'entities/contest'
import useAxios from 'shared/lib/hooks/useAxios'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { VStack } from 'shared/ui/stack'

import {
    selectContestMedia,
    selectContestOwnerId,
    selectContestText,
} from '../model/selectors'
import {
    fetchMediaWorks,
    fetchPopularMediaWorks,
    fetchPopularTextWorks,
    fetchTextWorks,
} from '../model/services'

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
    const text = useAppSelector(selectContestText)

    if (!id) {
        return <p>Something went wrong</p>
    }

    const { data, isLoading } = useAxios<Contest>(`contests/${id}`)

    useEffect(() => {
        if (!media.new.length || id !== ownerId) {
            dispatch(fetchMediaWorks(id))
        }
        if (!media.popular.length || id !== ownerId) {
            dispatch(fetchPopularMediaWorks(id))
        }
        if (!text.new.length || id !== ownerId) {
            dispatch(fetchTextWorks(id))
        }
        if (!text.popular.length || id !== ownerId) {
            dispatch(fetchPopularTextWorks(id))
        }
    }, [dispatch])

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
                <WinnersSection />
                <WorksListSection />
                <СommentsSection ownerId={id} />
            </VStack>
        </VStack>
    )
}

export default ContestPage
