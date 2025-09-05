import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import VStack from 'shared/ui/stack/vStack/vStack'
import { MobileFeedSection } from "widgets/mobileFeedSection";
import WorksSection from "widgets/worksSection/ui/worksSection";

import "./feedPage.scss"

export const FeedPage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 700);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

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

            {!isMobile && <WorksSection />}
            {isMobile && <MobileFeedSection />}
        </VStack>
    )
}