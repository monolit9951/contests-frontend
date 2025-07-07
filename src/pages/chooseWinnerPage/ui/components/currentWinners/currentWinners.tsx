import { FC } from "react";
import winCup from 'shared/assets/icons/winCup.svg'

import './currentWinners.scss'
import CurrentWinner from "../currentWinner/currentWinner";

const CurrentWinners: FC = () => {
    return(
        <div className="currentWinners">
            <div className="currentWinners_header">
                <img src={winCup} alt="winCup" />
                <div className="currentWinners_header_heading">Current Winners</div>
            </div>

            <div className="currentWinners_list">
                <CurrentWinner />
                <CurrentWinner />            
            </div>
        </div>
    )
}

export default CurrentWinners