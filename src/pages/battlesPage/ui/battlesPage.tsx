import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MobileWorkPreview } from "shared/ui/mobileWorkPreview";

import "./battlesPage.scss"

export const BattlesPage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 700);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    return(
        <div className="battlesPage">
            <Helmet>
                <title>DareBay | Battles</title>
                <meta property="og:title" content="All contestsm, main page" />
            </Helmet>

            <h2>BattlesPage</h2>

            {isMobile && <MobileWorkPreview/>}
        </div>
    )
}