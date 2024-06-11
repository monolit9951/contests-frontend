import React from "react";
import VStack from 'shared/ui/stack/vStack/vStack'
import WorksSection from "widgets/worksSection/ui/worksSection";

import "./feedPage.scss"

export const FeedPage: React.FC = () => {

    return (
        <VStack className="feed-page-wrapper">
            <WorksSection />
        </VStack>
    )
}