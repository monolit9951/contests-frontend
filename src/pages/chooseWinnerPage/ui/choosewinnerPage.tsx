import { FC, useEffect } from "react";
import { Button } from "shared/ui/button";

import CurrentWinners from "./components/currentWinners/currentWinners";
import WinnerSelectors from "./components/winnersSelectors/winnerSelectors";
import WinnerWork from "./components/winnerWork/winnerWork";

import './chooseWinnerPage.scss'
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// добавить параметр контестАйди
const ChooseWinnerPage: FC = () => {

    return(
        <div className="chooseWinnerPage">
            <div className="chooseWinnerPage_header">
                <div className="chooseWinnerPage_header_left">
                    <div className="chooseWinnerPage_header_heading">Contest Winners Selection</div>
                    <div className="chooseWinnerPage_header_desc">Select winners and assign them places</div>
                </div>

                <div className="chooseWinnerPage_header_right">
                    <ul>
                        <li>5 works</li>
                        <li>3 winners</li>
                        <li>2 days left</li>
                    </ul>
                </div>
            </div>

            <CurrentWinners />
            <div className="chooseWinnerPage_selectors">
                <WinnerSelectors />
            </div>

            <div className="winnersList">
                <WinnerWork isWin/>
                <WinnerWork />
                <WinnerWork />
                <WinnerWork />
                <WinnerWork />
            </div>

            <div className="chooseWinnerPage_paginationBtn">
                <Button variant="primary" >Load more</Button>
            </div>
        </div>
    )
}

export default ChooseWinnerPage