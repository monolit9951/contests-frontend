import { FC } from "react";
import './currentWinners.scss'
import winCup from 'shared/assets/icons/winCup.svg'

const CurrentWinners: FC = () => {
    return(
        <div className="currentWinners">
            <div className="currentWinners_header">
                <img src={winCup} alt="winCup" />
                <div className="currentWinners_header_heading">Current Winners</div>
            </div>
        </div>
    )
}

export default CurrentWinners