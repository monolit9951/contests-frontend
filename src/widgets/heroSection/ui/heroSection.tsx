import { ContestsFilter } from "shared/ui/contestsFilter"
import { Text } from "shared/ui/text";

import "./heroSection.scss"

export const HeroSection = () => {
    return (
        <div className="heroSection_container">
            <Text Tag="h2">Find a contest for yourself</Text>
            <Text Tag="p">Bring your best jokes, wittiest puns, and most infectious laughter,<br/> because in this competition, the funniest wins!</Text>
            <ContestsFilter/>
        </div>
    )
}