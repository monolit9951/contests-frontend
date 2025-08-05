import { FC, useMemo } from "react";
import win1 from 'shared/assets/icons/win1.svg'
import win2 from 'shared/assets/icons/win2.svg'
import win3 from 'shared/assets/icons/win3.svg'
import win4 from 'shared/assets/icons/win4.svg'

// компонент для отображения места пользователя
// нужно просто передать ему номер места (1, 2, 3, 4)

interface Props {
    place: number
}

const WinnerPlace: FC<Props> = ({place}) => {

    const medalSrc = useMemo(() => {
        switch (place) {
            case 1:
                return win1;
            case 2:
                return win2;
            case 3:
                return win3;
            default:
                return win4;
        }
    }, [place]);

    return(
        <img className="winnerPlace" src={medalSrc} alt="place" />
    )
}

export default WinnerPlace