import React from "react";
import {HStack} from "shared/ui/stack";
import VStack from 'shared/ui/stack/vStack/vStack'
import {Text} from "shared/ui/text";
import WorksSection from "widgets/worksSection/ui/worksSection";

import "./feedPage.scss"


export const FeedPage: React.FC = () => {

    return (
        <VStack className="feed-page-wrapper">
            <HStack>
                <Text Tag='h3'>FeedPage</Text>
            </HStack>
            <WorksSection />
        </VStack>
    )
}