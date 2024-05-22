import VStack from 'shared/ui/stack/vStack/vStack'
import {ContestWinnersTable} from "widgets/winnersTable";

import "./feedPage.scss"

export const FeedPage = () => {
    return (
        <VStack className="feed-page-wrapper">
            <h1>FeedPage</h1>
            <ContestWinnersTable/>
        </VStack>
    )
}