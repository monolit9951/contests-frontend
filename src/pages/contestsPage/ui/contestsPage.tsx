import { useEffect } from 'react'
import { useAppDispatch } from 'shared/lib/store'
import { VStack } from 'shared/ui/stack'
import { ContestsSection } from 'widgets/contestsSection'
import { HeroSection } from 'widgets/heroSection/ui/heroSection'

import { fetchContests, fetchPopularContests } from '../model/services'

import './contestsPage.scss'

export const ContestsPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchContests())
        dispatch(fetchPopularContests())
    }, [])

    return (
        <div className='contestsPage_container'>
            <HeroSection />
            <VStack className='contest-gallery__container'>
                <ContestsSection section='popular' />
                <ContestsSection section='all' />
            </VStack>
        </div>
    )
}
