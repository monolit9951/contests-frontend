import { FC } from "react";
import { Work } from "entities/work";
import cup from 'shared/assets/icons/winCup.svg'
import WinnerPlace from "shared/ui/winnerPlace";

import './currentWinner.scss'

interface Props {
    winnerData: Work
}

const CurrentWinner: FC<Props> = ({winnerData}) => {

    // возможно открывать модалку по нажатию

    return(
        <div className="currentWinner">
            <div className="currentWinner_left">
                <img src={cup} alt="win" />
                <img src={winnerData.user.profileImage? winnerData.user.profileImage : ''} alt="avatar" className="currentWinner_avatar"/>
                <div className="currentWinner_left_container">
                    <div className="currentWinner_content">{winnerData.description}</div>
                    <div className="currentWinner_name">{winnerData.user.name}</div>
                </div>
            </div>

            <div className="currentWinner_right">
                <WinnerPlace place={6} />
            </div>
        </div>
    )
}

export default CurrentWinner