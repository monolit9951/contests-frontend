import { useEffect } from 'react'
import { Helmet } from "react-helmet";
import {
    selectActiveFilters,
    selectCategory,
    selectSortDirection,
} from 'features/filterContests'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { VStack } from 'shared/ui/stack'
import { ContestsSection } from 'widgets/contestsSection'
import { HeroSection } from 'widgets/heroSection/ui/heroSection'

import { selectSearchString } from '../model/selectors'
import { fetchContests } from '../model/services'

import './contestsPage.scss'

export const ContestsPage = () => {
    const dispatch = useAppDispatch()

    const activeFilters = useAppSelector(selectActiveFilters)
    const category = useAppSelector(selectCategory)
    const sortDirection = useAppSelector(selectSortDirection)
    const searchString = useAppSelector(selectSearchString)

    useEffect(() => {
        dispatch(fetchContests())
    }, [dispatch, activeFilters, category, sortDirection, searchString])

    // useEffect(() => {
    //     dispatch(fetchPopularContests())
    // }, [dispatch])

    return (
        <div className='contestsPage_container'>

            <Helmet>
                <title>DareBay | All contests</title>
                <meta property="og:title" content='All contests page' />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta name="description"  content='DareBay all contests page' />
                <meta property="og:description" content='DareBay all contests page' />
            </Helmet>

            <HeroSection />
            <VStack className='contest-gallery__container'>
                {/* <ContestsSection section='popular' /> */}
                <ContestsSection section='all' />
            </VStack>
        </div>
    )
}

