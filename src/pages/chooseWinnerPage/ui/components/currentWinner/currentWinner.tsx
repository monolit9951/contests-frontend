import { FC } from "react";
import './currentWinner.scss'
import cup from 'shared/assets/icons/winCup.svg'
import avatarSample from 'shared/assets/img/userIMG.jpg'
import WinnerPlace from "shared/ui/winnerPlace";

const CurrentWinner: FC = () => {
    return(
        <div className="currentWinner">
            <div className="currentWinner_left">
                <img src={cup} alt="win" />
                <img src={avatarSample} alt="avatar" className="currentWinner_avatar"/>
                <div className="currentWinner_left_container">
                    <div className="currentWinner_content">In the rhythm of the quest!</div>
                    <div className="currentWinner_name">Deborah Kertzmann</div>
                </div>
            </div>

            <div className="currentWinner_right">
                <WinnerPlace place={6} />
            </div>
        </div>
    )
}

export default CurrentWinner