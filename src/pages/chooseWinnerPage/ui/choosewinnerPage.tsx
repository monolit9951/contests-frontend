import { FC } from "react";
import { useParams } from "react-router-dom";
import { Contest } from "entities/contest";
import { Work } from "entities/work";
import useAxios from "shared/lib/hooks/useAxios";
import { Button } from "shared/ui/button";

import CurrentWinners from "./components/currentWinners/currentWinners";
import WinnerSelectors from "./components/winnersSelectors/winnerSelectors";
import WinnerWork from "./components/winnerWork/winnerWork";

import './chooseWinnerPage.scss'

// добавить параметр контестАйди
const ChooseWinnerPage: FC = () => {

    const {id} = useParams()

    const { data: contest, isLoading: contestIsLoading} = useAxios<Contest>(`contests/${id}`)
    const { data: works, isLoading: worksIsLoading} = useAxios<Work[]>(`works/byContestId/${id}`)
    const { data: winners, isLoading: winnersLoading} = useAxios(`contests/${id}/possible-winners`)

    console.log(winners)


    return(
        <div className="chooseWinnerPage">
            <div className="chooseWinnerPage_header">
                <div className="chooseWinnerPage_header_left">
                    <div className="chooseWinnerPage_header_heading">Contest Winners Selection</div>
                    <div className="chooseWinnerPage_header_desc">Select winners and assign them places</div>
                </div>

                {!contestIsLoading && <div className="chooseWinnerPage_header_right">
                    <ul>
                        <li>{contest?.participantAmount} participants</li>
                        <li>Empty tag</li>
                        <li>{contest?.subcategory}</li>
                    </ul>
                </div>}
            </div>

            <CurrentWinners />
            
            <div className="chooseWinnerPage_selectors">
                <WinnerSelectors />
            </div>

            {/* <div className="winnersList">
                {!worksIsLoading && works?.content?.map((data: Work, index: number) => (
                    <WinnerWork isWin work = {data} key={index} />
                ))}
            </div> */}

            <div className="chooseWinnerPage_paginationBtn">
                <Button variant="primary" >Load more</Button>
            </div>
        </div>
    )
}

export default ChooseWinnerPage