import { FC } from "react";
import CustomSelector from "widgets/customSelector";

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
        <div>
            <CustomSelector options = {reatingOptions} name="Reating" maxWidth={232} chooseSelectorCallback={chooseSelectorCallback}/>
        </div>
    )
}

export default WinnerSelectors