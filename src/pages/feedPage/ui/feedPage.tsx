import React from "react";
import { Helmet } from "react-helmet";
import VStack from 'shared/ui/stack/vStack/vStack'
import WorksSection from "widgets/worksSection/ui/worksSection";

import "./feedPage.scss"

export const FeedPage: React.FC = () => {

    return (
        <VStack className="feed-page-wrapper">

            <Helmet>
                <title>DareBay | Feed</title>
                <meta property="og:title" content='Feed page' />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta name="description"  content='Feed page, all participants works' />
                <meta property="og:description" content='Feed page, all participants works' />
            </Helmet>

            <WorksSection />
        </VStack>
    )
}