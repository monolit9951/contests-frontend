import { Helmet } from "react-helmet";

import "./topUsersPage.scss"

export const TopUsersPage = () => {
    return (
        <div className="topUsersPage">
            <Helmet>
                <title>DareBay | Top users</title>
                <meta property="og:title" content='Top users page' />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta name="description"  content='Top users page' />
                <meta property="og:description" content='Top users page' />
            </Helmet>

            <h1>TopUsersPage</h1>
        </div>
    )
}