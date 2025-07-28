import { FC } from "react";
import { Prize } from "entities/prize";
import WinnerPlace from "shared/ui/winnerPlace";

import './prizeList.scss'

interface Props {
    prizes: Prize[]
}

const PrizeList: FC<Props> = ({prizes}) => {
    return (
        <div className="prizeList">
            <h3>Prize list (просто для отображения призов)</h3>

            <ul className="prizeList_list">
                {prizes.map((item: Prize, index: number) => (
                    <li key={index}>
                        <div>Prize: <span>{item.prizeText}</span></div>
                        <div>Amount: <span>{item.winnersAmount}</span></div>
                        <WinnerPlace place={item.place} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PrizeList