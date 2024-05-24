import VStack from 'shared/ui/stack/vStack/vStack'
import WorksSection from "widgets/worksSection/ui/worksSection";

import "./feedPage.scss"


export const FeedPage = () => {
    return (
        <VStack className="feed-page-wrapper">
            <h1>FeedPage</h1>
            <WorksSection />
        </VStack>
    )
}