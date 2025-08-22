import { Helmet } from "react-helmet";

import "./battlesPage.scss"

export const BattlesPage = () => {

    return(
        <div className="battlesPage">
            <Helmet>
                <title>DareBay | All contests</title>
                <meta property="og:title" content="All contestsm, main page" />
            </Helmet>

            <h2>BattlesPage</h2>
        </div>
    )
}