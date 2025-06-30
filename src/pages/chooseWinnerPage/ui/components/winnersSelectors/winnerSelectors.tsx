import { FC } from "react";
import CustomSelector from "widgets/customSelector";
import './winnerSelectors.scss'

interface optionsType {
    text: string,
    key: string
}

const WinnerSelectors: FC = () => {

    const reatingOptions: optionsType[] = 
    [{
        text: 'Reating (Hight to Low)',
        key: 'reatingHL'
    },{
        text: 'Reating (Low to Hight)',
        key: 'reatingLH'
    }]

    const chooseSelectorCallback = (key: string) => {
        console.log(key)
    }

    return(
        <div className="customSelectors">
            <CustomSelector options = {reatingOptions} name="Reating" maxWidth={300} chooseSelectorCallback={chooseSelectorCallback}/>
            <CustomSelector options = {reatingOptions} name="Reating" maxWidth={200} chooseSelectorCallback={chooseSelectorCallback}/>
            <CustomSelector options = {reatingOptions} name="Reating" maxWidth={500} chooseSelectorCallback={chooseSelectorCallback}/>
        </div>
    )
}

export default WinnerSelectors