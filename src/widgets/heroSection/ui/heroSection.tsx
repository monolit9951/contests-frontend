import { ContestsFilter } from "shared/ui/contestsFilter"

import bgImg from "../../../shared/assets/img/bg@1x.jpg";

import "./heroSection.scss"

export const HeroSection = () => {
    return (
        <div className="heroSection_container" style={{backgroundImage: `url(${bgImg})`}}>
            <h2>Find a contest for yourself</h2>
            <p>Bring your best jokes, wittiest puns, and most infectious laughter,<br/> because in this competition, the funniest wins! </p>
            <ContestsFilter/>
        </div>
    )
}