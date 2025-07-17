import { FC } from "react";
import winCup from 'shared/assets/icons/winCup.svg'

import CurrentWinner from "../currentWinner/currentWinner";

import './currentWinners.scss'

interface Props {
    winners: any
}

const CurrentWinners: FC<Props> = ({winners}) => {
    return(
        <div className="currentWinners">
            <div className="currentWinners_header">
                <img src={winCup} alt="winCup" />
                <div className="currentWinners_header_heading">Current Winners</div>
            </div>

            <div className="currentWinners_list">
                {winners.length > 0 && winners.map((data: any, index: nuber) => (
                    <CurrentWinner winnerData = {data} key={index}/>
                ))}
                {/* <CurrentWinner />  */}
            </div>
        </div>
    )
}

export default CurrentWinners