import VStack from 'shared/ui/stack/vStack/vStack'
import {Text} from "shared/ui/text";
import WorksSection from "widgets/worksSection/ui/worksSection";

import "./feedPage.scss"


export const FeedPage = () => {
    return (
        <VStack className="feed-page-wrapper">
            <Text Tag='h3'>FeedPage</Text>
            <WorksSection />
        </VStack>
    )
}