import { useParams } from 'react-router-dom'
import { Contest } from 'entities/contest'
import useAxios from 'shared/lib/hooks/useAxios'
import { VStack } from 'shared/ui/stack'
import { ContestHeroSection as HeroSection } from 'widgets/contestHeroSection'
import { WinnersSection } from 'widgets/winnersSection'

import './contestPage.scss'

const ContestPage = () => {
    const { id } = useParams<{ id: string }>()

    const { data, isLoading } = useAxios<Contest>(`contests/${id}`)

    if (isLoading) {
        return <>Loading...</>
    }

    return (
        <VStack className='contest'>
            <HeroSection
                bg={data?.backgroundImage}
                owner={data?.contestOwner}
            />
            <VStack className='contest__container'>
                {/* <DescriptionSection /> */}
                <WinnersSection />
                {/* <WorksListSection /> */}
                {/* <CommentsSection /> */}
            </VStack>
        </VStack>
    )
}

export default ContestPage
