import { VStack } from 'shared/ui/stack'
import { ContestsSection } from 'widgets/contestsSection'
import { HeroSection } from 'widgets/heroSection/ui/heroSection'

import './contestsPage.scss'

export const ContestsPage = () => {
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
