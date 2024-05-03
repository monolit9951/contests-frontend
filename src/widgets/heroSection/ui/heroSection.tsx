import { ContestsFilter } from "shared/ui/contestsFilter"
import { Text } from "shared/ui/text";

import bgImg from "../../../shared/assets/img/bg@1x.jpg";

import "./heroSection.scss"

export const HeroSection = () => {
    return (
        <div className="heroSection_container" style={{backgroundImage: `url(${bgImg})`}}>
            <Text Tag="h2">Find a contest for yourself</Text>
            <Text Tag="p">Bring your best jokes, wittiest puns, and most infectious laughter,<br/> because in this competition, the funniest wins!</Text>
            <ContestsFilter/>
        </div>
    )
}