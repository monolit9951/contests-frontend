import { FC } from "react";
import CustomSelector from "widgets/customSelector";

import './winnerSelectors.scss'

export interface optionsType {
    text: string,
    key: string
}

interface Props {
    chooseSelectorCallback: (key: string) => void
}

const WinnerSelectors: FC<Props> = ({chooseSelectorCallback}) => {

    const reatingOptions: optionsType[] = 
    [{
        text: 'All works',
        key: 'allWorks'
    },{
        text: 'Winners works',
        key: 'winWorks'
    }]

    return(
        <div className="customSelectors">
            <CustomSelector options = {reatingOptions} name="Reating" maxWidth={300} defaultItem chooseSelectorCallback={chooseSelectorCallback}/>
            {/* <CustomSelector options = {reatingOptions} name="Reating" maxWidth={200} chooseSelectorCallback={chooseSelectorCallback}/> */}
            {/* <CustomSelector options = {reatingOptions} name="Reating" maxWidth={500} chooseSelectorCallback={chooseSelectorCallback}/> */}
        </div>
    )
}

export default WinnerSelectors